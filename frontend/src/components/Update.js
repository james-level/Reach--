import React, { Component } from "react";

class Update extends Component {
  constructor(props) {
    super(props);


  }

  updateReach(){

    var name = this.props.data.name;
    var bio = this.props.data.bio;
    var looking_for = this.props.data.looking_for
    var location = this.props.data.location
    var date_of_birth = this.props.data.date_of_birth
    var gender = this.props.data.gender
    var twitter_handle = this.props.data.twitter_handle
    var instagram_handle = this.props.data.instagram_handle
    var youtube_handle = this.props.data.youtube_handle
    var twitter_followers = this.props.data.twitter_followers
    var instagram_followers = this.props.data.instagram_followers
    var youtube_followers = this.props.data.youtube_followers
    var picture_one = this.props.data.photo1
    var picture_two = this.props.data.photo2
    var picture_three = this.props.data.photo3
    var picture_four = this.props.data.photo4
    var picture_five = this.props.data.photo5
    var picture_six = this.props.data.photo6

  }

  render(){

    return(

      <div className="pulsating-circle" onClick={this.updateMyReach}>Update My Reach!</div>

    )
  }
}


export default Update;
