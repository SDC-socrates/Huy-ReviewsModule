import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './Reviews.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }

  getFetch() {
    axios.get('/api/turash/reviews/:id')
    .then ( (result) => {
      this.setState({ reviews : result.data });
    })
    .catch( (err) => {
      console.log(err);
    })
  }

  componentDidMount () {
    this.getFetch();
  }
  render () {
    return (
      <table className="reviewsTable">
        <tbody className="tableBody">
          { this.state.reviews.map( (element, key) => <Reviews review={element} key={key} />)
          }
        </tbody>
      </table>
    );
  }
}

export default App;