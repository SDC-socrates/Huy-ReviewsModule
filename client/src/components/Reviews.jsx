import React from 'react';
import ReactDOM from 'react-dom';

class Reviews extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
      <tr className="tableRow">
        <td id="picture">
          'Picture'
        </td>

        <td id="reviewAndName">
          'Review'
          <tr id="review">
            <td> 'test' </td>
            <td> 'testag' </td>
          </tr>
        </td>
      </tr>
    );
  }
}

export default Reviews;