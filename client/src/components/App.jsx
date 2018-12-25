import React from 'react';
import axios from 'axios';
import Reviews from './Reviews';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewCount: 0,
      LimitPerSet: 15,
      retrievedCount: 15,
      numOfClick: 1
    };
  }

  componentDidMount() {
    this.getreviewCount();
    this.getReviews();
  }

  getReviews() {
    var prevReviews = this.state.reviews;
    axios.get('/api/turash/reviews/:id', {
      params: {
        endNumForNextSet: this.state.retrievedCount
      }
    })
    .then((result) => {
      prevReviews = result.data.reverse().concat(prevReviews);
      this.setState({ reviews: prevReviews });
    })
    .catch((err) => {
      if (err) { throw err; }
    });
  }

  getreviewCount() {
    axios.get('/api/turash/reviews/:id/reviewCount')
      .then((result) => {
        this.setState({ reviewCount: result.data[0]['count(*)']});
      })
      .catch((err) => {
        if (err) { throw err; }
      });
  }

  handleClick(event) {
    console.log('clicked', event);
    var tempVal = this.state.numOfClick;
    tempVal++;
    if (tempVal * 5 === this.state.LimitPerSet) {
      this.setState({ numOfClick: tempVal });
      this.setState({ retrievedCount: this.state.retrievedCount += 15 });
      this.setState({ LimitPerSet: this.state.LimitPerSet += 15 });
      this.getReviews();
    } else {
      this.setState({ numOfClick: tempVal });
    }

  }

  // TODO: Function to fetch for specific review
  render() {
    const { reviews } = this.state;
    const { reviewCount} = this.state;
    const { numOfClick } = this.state;

    console.log('org before: ', this.state.reviews);
    console.log('numOfClick: ', this.state.numOfClick);
    var showReviews = this.state.reviews.slice(0, numOfClick * 5);
    console.log('retrievedCount', this.state.retrievedCount);
    console.log('org after: ', this.state.reviews);
    console.log('showReviews', showReviews);

    return (
      <div className="reviews">

        <div className="reviewLabel"> Reviews </div>
        <div className="starAndNumOfReviews">
          <div className="starRating"> Stars </div>
          <div id="numOfReviews"> - { reviewCount } ratings </div>
        </div>
        {
          showReviews.map((element, key) => (
            <Reviews
              review={element}
              key={parseInt(key.toString(), 10)}
            />
          ))
        }
        <button className="moreReviews" onClick={this.handleClick.bind(this)}> See More Feedbacks </button>
      </div>
    );
  }
}

export default App;
