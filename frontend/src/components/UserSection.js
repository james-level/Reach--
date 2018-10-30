import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';


class UserSection extends Component {
  constructor(props) {
    super(props);
    this.state = {


    }

  }


//   animateCard(){
//     $(window).on('load',function(){
//   $('#wrapper').addClass('loaded');
// })
//
// $('.more-info').click(function(){
//   $("#card").toggleClass('flip');
//   $('#arrow').remove();
// });
// $('#background').click(function(){
//   $('#card').removeClass('flip');
// })
//   }


render(){

  // this.animateCard()

  return (

    <div id="wrapper">
  <div id="content">
    <div id="card">
      <div id="front">
        <div id="arrow"><i class="fa fa-arrow-left"></i></div>
        <div id="top-pic"></div>
        <div id="avatar"></div>
        <div id="info-box">
          <div class="info">
            <h1>Jesse Couch</h1>
            <h2>Digital Creative</h2>
          </div>
        </div>
        <div id="social-bar">
          <a href="https://www.facebook.com/designcouch" target="_blank">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com/designcouch" target="_blank">
          <i class="fa fa-twitter"></i>
          </a>
          <a href="https://www.dribbble.com/designcouch" target="_blank">
          <i class="fa fa-dribbble"></i>
          </a>
          <a href="https://www.codepen.io/designcouch/public">
          <i class="fa fa-codepen"></i>
          </a>

          <a href="javascript:void" class="more-info">
            <i class="fa fa-user"></i>
          </a>
        </div>
      </div>
      <div id="back">
        <div class="back-info">
          <p>My name is Jesse Couch, and I am an award winning, intensely creative, coffee-fueled front-end web designer and developer. My style and approach are very straight-forward — I obsess about keeping things as simple as humanly possible. That's it. If you like bells and whistles for the sake of bells and whistles, look elsewhere - but if you want to remain laser-focused on the goals for your new website, it's time time to talk.</p>
        </div>
        <div id="social-bar">
          <a href="https://www.facebook.com/designcouch" target="_blank">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com/designcouch" target="_blank">
          <i class="fa fa-twitter"></i>
          </a>
          <a href="https://www.dribbble.com/designcouch" target="_blank">
          <i class="fa fa-dribbble"></i>
          </a>
          <a href="https://www.codepen.io/designcouch/public">
          <i class="fa fa-codepen"></i>
          </a>
          <a href="javascript:void" class="more-info">
            <i class="fa fa-undo"></i>
          </a>
        </div>
      </div>
    </div>
    <div id="background">
      <div id="background-image"></div>
    </div>
  </div>
</div>
  )


}

}

export default UserSection;
