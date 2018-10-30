import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';


class UserSection extends Component {
  constructor(props) {
    super(props);
    this.state = {


    }

  }

animate(){

  $(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);

}

total_reach(instagram_followers, twitter_followers, youtube_followers){return instagram_followers + twitter_followers + youtube_followers}



render(){

  this.animate()

  return (

    <div className="user_card">

    <figure class="snip1344"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample1.jpg" alt="profile-sample1" class="profile"/>
  <figcaption>
    <h3>{this.props.loggedInAs}<span>Reach: {this.total_reach(this.props.data.instagram_followers, this.props.data.twitter_followers, this.props.data.youtube_followers)}</span><span>{this.props.data.location}</span></h3>
    <div class="icons"><a href="#"><i class="ion-social-reddit-outline"></i></a><a href="#"> <i class="ion-social-twitter-outline"></i></a><a href="#"> <i class="ion-social-vimeo-outline"></i></a></div>
  </figcaption>
</figure>

    </div>
  )


}

}

export default UserSection;
