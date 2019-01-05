import React from 'react';

const Picture = (props) => (
  // console.log('props', props),

  <div className="individualReview">
    <div className="picture"> </div>

    <div className="reviewAndName">
      <div className="review">
        {props.review.review}
      </div>
      <div className="userName">
        <a id="reviewA" > {props.review.name} </a>
      </div>

      <div className="date"> -- {props.review.date} </div>
    </div>
  </div>
);

export default Picture;
