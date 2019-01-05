import React from 'react';
import axios from 'axios';
import Reviews from './Reviews';
import ReactModal from 'react-modal';
import Rating from './StarRating';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      ratings: [],
      id: 1,
      averageRating: 0,
      reviewCount: 0,
      numOfClick: 1,
      showModal: false,
      userName: "",
      userReview: "",
      userRating: 0,
      showSeeMore: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.getreviewCount();
    this.getReviews();
    this.getRatings();
    ReactModal.setAppElement('#Reviews');
  }


  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  getRatings () {
    var id = 0;
    // This should be refactored
    var submittedId = window.location.pathname.slice(1, window.location.pathname.length - 1);

    if(submittedId) {
      id = Number(submittedId);
    } else {
      id = this.state.id;
    }

    axios.get(`http://localhost:3001/api/turash/reviews/:${id}/ratings`, {
      params: {
        id: id
      }
    })
    .then( (result) => {
      this.setState({ ratings: result });
      this.calculateRating();
    })
  }

  calculateRating () {
    const { ratings } = this.state;
    const { reviewCount } = this.state;

    var totalRating = 0;
    if (ratings !== undefined) {
      ratings.data.forEach( (currentIndex) => {
        totalRating += currentIndex.rating;
      });

      // console.log('total rating', totalRating/reviewCount);
      this.setState({ averageRating: totalRating/reviewCount});
    }
  }

  getReviews () {
    var id = 0;
    // This should be refactored
    var submittedId = window.location.pathname.slice(1, window.location.pathname.length - 1);

    if(submittedId) {
      id = Number(submittedId);
    } else {
      id = this.state.id;
    }

    axios.get(`http://localhost:3001/api/turash/reviews/:${id}`, {
      params: {
        id: id
      }
    })
    .then((result) => {

      if (result.data.length === 0) {
        alert("ID does not exist!");
      } else {
        this.setState({ reviews: result.data.reverse() });
      }
    })
    .catch((err) => {
      if (err) {
        console.log('Client unable to retrieve reviews.')
      }
    });
  }

  getreviewCount () {

    // TODO: This needs to be refactored
    var id = 0;
    var submittedId = window.location.pathname.slice(1, window.location.pathname.length - 1);

    if(submittedId) {
      id = Number(submittedId);
    } else {
      id = this.state.id;
    }

    axios.get(`http://localhost:3001/api/turash/reviews/:${id}/reviewCount`, {
      params: {
        id: id
      }
    })
      .then((result) => {
        this.setState({ reviewCount: result.data[0]['count(*)']}, () => {
          if (this.state.reviewCount > 5) {
            this.setState({ showSeeMore: true })
          }
        });
      })
      .catch((err) => {
        if (err) { throw err; }
      });
  }

  handleMoreReviews (event) {
    // console.log('moreReviews clicked', event);
    var tempVal = this.state.numOfClick;
    tempVal++;
    console.log('temp val', tempVal * 5);
    if (tempVal * 5 >= this.state.reviewCount) {
      this.setState({ showSeeMore: false });
      this.setState({ numOfClick: tempVal })
    }
  }

  handleChange (event) {
    // console.log("the event name", (event.target.name));
    this.setState({
      [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
    });
  }

  handleSubmit (event) {
    event.preventDefault();

    // TODO: refactor this
    var id = 0;
    var submittedId = window.location.pathname.slice(1, window.location.pathname.length - 1);

    if(submittedId) {
      id = Number(submittedId);
    } else {
      id = this.state.id;
    }

    if ((typeof this.state.userRating) === 'number' && (this.state.userRating <= 5 && this.state.userRating > 0)) {
      alert("Submitted. Thank you!");
      axios({
        method: 'post',
        url: `http://localhost:3001/api/turash/reviews/:${id}/addReview`,
        data: {
          userName: this.state.userName,
          userReview: this.state.userReview,
          userRating: this.state.userRating,
          id: id
        }
      })
      .then( (result) => {
        this.handleCloseModal();
        this.getreviewCount();
        this.getReviews();
        this.getRatings();
        this.setState({
          userName: "",
          userReview:  "",
          userRating: 0
        })
        console.log('Saved to DB');
      })
      .catch( (err) => {
        if (err) {
          console.log ("Error Adding User Review");
        }
      })
    } else {
      alert('Enter valid rating from 1 to 5');
      this.setState({ userRating: 0 });
    }
  }

  renderSeeMoreButton () {
    return (
      <button className="moreReviews" onClick={this.handleMoreReviews.bind(this)}> See More Feedbacks </button>
    );
  }

  render() {
    // TODO: Update ratings, reviews count when new review added
    const { reviews } = this.state;
    const { reviewCount} = this.state;
    const { numOfClick } = this.state;
    const { averageRating } = this.state;
    var showReviews = this.state.reviews.slice(0, numOfClick * 5);
    return (
      <div className="reviews">
        <div className="reviewLabel"> Reviews </div>
        <div className="starAndNumOfReviews">
          <div className="starRating">
            <Rating
              rating={averageRating}
            />
          </div>
          <div id="numOfReviews">
            <div className="circle">
              { reviewCount } ratings
            </div>
          </div>
        </div>
        {
          showReviews.map((element, key) => (
            <Reviews
              review={element}
              key={parseInt(key.toString(), 10)}
            />
          ))
        }


        { this.state.showSeeMore ? this.renderSeeMoreButton() : null }

        <button className="addNewReview" onClick={this.handleOpenModal.bind(this)}> Add A Review </button>

        <ReactModal isOpen={this.state.showModal} contentLabel=" Add New User " >

        <form onSubmit={this.handleSubmit.bind(this)} >
          <label>
            Full Name:
            <input type="text" value={this.state.userName} name="userName" onChange={this.handleChange.bind(this)}/>
            <br/><br/>
            Review:
            <br/>
             <textarea type="text" value={this.state.userReview} name="userReview" onChange={this.handleChange.bind(this)}/>
             <br/><br/>
             Rating:
             <input type="number" value={this.state.userRating} name="userRating" onChange={this.handleChange.bind(this)}/> / 5
             <br/><br/>
             <input type="submit" value="Submit" />
          </label>
        </form>
          <br/>
          <button onClick={this.handleCloseModal}> Nevermind! </button>
        </ReactModal>
      </div>
    );
  }
}

export default App;
