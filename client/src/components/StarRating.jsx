import React from 'react';
import StarRatings from 'react-star-ratings';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }

  changeRating (newRating, name) {
    this.setState({
      rating: newRating,
    });
  }

  render () {
    return (
      <StarRatings
        rating={this.props.rating}
        starRatedColor="#8F63F4"
        changeRating={this.changeRating.bind(this)}
        numberOfStars={5}
        name="rating"
        starDimension="20px"
        starSpacing="1px"
        isSelectable={false}
      />
    );
  }
}

export default Rating;
