import React from "react";

const GalleryDots = ({ user }) => (

  [user.picture, user.picture_two, user.picture_three, user.picture_four, user.picture_five, user.picture_six]

  .filter(image => image !== null)

  .map(image =>{

  return (

      <label for={`slide-dot-` + [user.picture, user.picture_two, user.picture_three, user.picture_four, user.picture_five, user.picture_six]

        .indexOf(image)}>

      </label>

    )
  }
)

);

export default GalleryDots;
