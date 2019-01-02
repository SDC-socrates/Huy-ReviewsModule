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
      averageRating: 0,
      reviewCount: 0,
      LimitPerSet: 15,
      retrievedCount: 15,
      numOfClick: 1,
      showModal: false,
      userName: "",
      userReview: "",
      userRating: 0,
      showSeeMore: true
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.getreviewCount();
    this.getReviews();
    this.getRatings();
    ReactModal.setAppElement('#root');
  }


  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  getRatings () {
    axios.get('/api/turash/reviews/:id/ratings')
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

      console.log('total rating', totalRating/reviewCount);
      this.setState({ averageRating: totalRating/reviewCount});
    }
  }

  getReviews () {
    var prevReviews = this.state.reviews;
    // console.log('num is', this.state.reviewCount - this.state.retrievedCount)
    axios.get('/api/turash/reviews/:id', {
      params: {
        endNumForNextSet: this.state.retrievedCount
      }
    })
    .then((result) => {
      // console.log('result is', result);
      prevReviews = result.data.reverse().concat(prevReviews);
      this.setState({ reviews: prevReviews });
    })
    .catch((err) => {
      if (err) { throw err; }
    });
  }

  getreviewCount () {
    axios.get('/api/turash/reviews/:id/reviewCount')
      .then((result) => {
        this.setState({ reviewCount: result.data[0]['count(*)']});
      })
      .catch((err) => {
        if (err) { throw err; }
      });
  }

  handleMoreReviews (event) {
    // console.log('moreReviews clicked', event);
    var tempVal = this.state.numOfClick;
    tempVal++;
    if (tempVal * 5 === this.state.LimitPerSet) {
      this.setState({ numOfClick: tempVal });
      this.setState({ retrievedCount: this.state.retrievedCount += 15 });
      this.setState({ LimitPerSet: this.state.LimitPerSet += 15 });

      // Hide "see more" button
       if ( this.state.retrievedCount === this.state.reviewCount || this.state.retrievedCount > this.state.reviewCount ) {
      this.setState({ showSeeMore: false });
      } else {
        // Retrieve more reviews
        this.getReviews();
      }
    } else {
      // Update state to re-render
      this.setState({ numOfClick: tempVal });
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
    console.log('type', typeof this.state.userRating);
    if ((typeof this.state.userRating) === 'number' && (this.state.userRating <= 5 && this.state.userRating > 0)) {
      alert("Submitted. Thank you!");
      console.log('name, review, rating', this.state.userName, this.state.userReview, this.state.userRating);
      axios({
        method: 'post',
        url: '/api/turash/reviews/:id/addReview',
        data: {
          userName: this.state.userName,
          userReview: this.state.userReview,
          userRating: this.state.userRating
        }
      })
      .then( (result) => {
        this.handleCloseModal();
        this.getreviewCount();
        this.getReviews();
        this.getRatings();
        console.log('Saved to DB');
      })
      .catch( (err) => {
        if (err) { throw err; }
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
