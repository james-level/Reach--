import React, { Component } from "react";

class Gallery extends Component {

  constructor(props) {
    super(props);

  }


  render(){

    const GalleryDots = this.props.gallery_dots ? ( this.props.gallery_dots ) : (<p></p>)

    return (

      <div class="slider-container">
        <div class="slider-menu">
        {GalleryDots}
        </div>

         <input id="slide-dot-1" type="radio" name="slides"></input>
        <div class="slide slide-1" style={{backgroundImage: `url(${this.props.data.picture_six})`}}></div>

        <input id="slide-dot-2" type="radio" name="slides"></input>
         <div class="slide slide-2" style={{backgroundImage: `url(${this.props.data.picture_two})`}}></div>

         <input id="slide-dot-3" type="radio" name="slides"></input>
         <div class="slide slide-3" style={{backgroundImage: `url(${this.props.data.picture_three})`}}></div>

         <input id="slide-dot-4" type="radio" name="slides"></input>
         <div class="slide slide-4" style={{backgroundImage: `url(${this.props.data.picture_four})`}}></div>

         <input id="slide-dot-5" type="radio" name="slides"></input>
         <div class="slide slide-5" style={{backgroundImage: `url(${this.props.data.picture_five})`}}></div>

         <input id="slide-dot-6" type="radio" name="slides"></input>
         <div class="slide slide-6" style={{backgroundImage: `url(${this.props.data.picture})`}}></div>
       </div>

    )

  }

}

export default Gallery;
