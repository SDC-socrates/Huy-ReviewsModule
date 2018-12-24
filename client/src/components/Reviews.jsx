import React from 'react';

const Picture = (props) => (
  console.log('props', props),

  <div className="individualReview">
    <div className="picture"> </div>

    <div className="reviewAndName">
      <div>
        {props.review.review}
      </div>
      <div className="userName">
        <a href=""> {props.review.name} </a>
      </div>

      <div className="rating"> {props.review.rating} </div>
    </div>
  </div>
);

export default Picture;
