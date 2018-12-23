import React from 'react';
import axios from 'axios';
import Reviews from './Reviews';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    this.getAllReviews();
  }

  getAllReviews() {
    axios.get('/api/turash/reviews/:id')
      .then((result) => {
        this.setState({ reviews: result.data });
      })
      .catch((err) => {
        if (err) { throw err; }
      });
  }

  // TODO: Function to fetch for specific review
  render() {
    const { reviews } = this.state;
    return (
      <div className="reviews">
        {
          reviews.map((element, key) => (
            <Reviews
              review={element}
              key={parseInt(key.toString(), 10)}
            />
          ))
        }
      </div>
    );
  }
}

export default App;
