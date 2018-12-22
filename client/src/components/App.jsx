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

  render() {
    const { reviews } = this.state;
    return (
      <table className="reviewsTable">
        <tbody className="tableBody">
          {
            reviews.map((element, key) => (
              <Reviews
                review={element}
                key={parseInt(key.toString(), 10)}
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default App;
