import React from "react";

const GalleryDots = ({ user }) => (

  var imageArray = [user.picture, user.picture_two, user.picture_three, user.picture_four, user.picture_five, user.picture_six];

  const galleryDots = imageArray.filter(image => image !== null).map(image =>{

  return (

      <label for={`slide-dot-` + imageArray.indexOf(image)}> </label>

    )
  }
)

  return galleryDots;

);

export default GalleryDots;
