import React from 'react';
import axios from 'axios';
import Reviews from './Reviews';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewCount: 0
    };
  }

  componentDidMount() {
    this.getAllReviews();
    this.getreviewCount();
  }

  getAllReviews() {
    axios.get('/api/turash/reviews/:id')
      .then((result) => {
        this.setState({ reviews: result.data.reverse() });
      })
      .catch((err) => {
        if (err) { throw err; }
      });
  }

  getreviewCount() {
    axios.get('/api/turash/reviews/:id/reviewCount')
      .then((result) => {
        console.log('result is', result);
        this.setState({ reviewCount: result.data[0]['count(*)']});
      })
      .catch((err) => {
        if (err) { throw err; }
      });
  }



  // TODO: Function to fetch for specific review
  render() {
    const { reviews } = this.state;
    const { reviewCount} = this.state;
    return (
      <div className="reviews">

        <div className="reviewLabel"> Reviews </div>
        <div className="starAndNumOfReviews">
          <div className="starRating"> Stars </div>
          <div id="numOfReviews"> - { reviewCount } ratings </div>
        </div>
        {
          reviews.map((element, key) => (
            <Reviews
              review={element}
              key={parseInt(key.toString(), 10)}
            />
          ))
        }

        <button className="moreReviews"> See More Reviews </button>
      </div>
    );
  }
}

export default App;
