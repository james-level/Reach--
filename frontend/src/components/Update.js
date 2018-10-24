import React, { Component } from "react";
import axios from 'axios';

class Update extends Component {
  constructor(props) {
    super(props);

      this.state = {

        reachUpdated: false

      }

      this.updateReach = this.updateReach.bind(this)

  }

  updateReach(){

    var username = this.props.loggedInAs;

    var user = this.props.data.user;
    var name = this.props.data.name;
    var bio = this.props.data.bio;
    var looking_for = this.props.data.looking_for;
    var location = this.props.data.location;
    var date_of_birth = this.props.data.date_of_birth;
    var gender = this.props.data.gender_identity;
    var twitter_handle = this.props.data.twitter_handle;
    var instagram_handle = this.props.data.instagram_handle;
    var youtube_handle = this.props.data.youtube_handle;
    var twitter_followers = this.props.data.twitter_followers;
    var instagram_followers = this.props.data.instagram_followers;
    var youtube_followers = this.props.data.youtube_followers;
    var picture_one = this.props.data.picture;
    var picture_two = this.props.data.picture_two;
    var picture_three = this.props.data.picture_three;
    var picture_four = this.props.data.picture_four;
    var picture_five = this.props.data.picture_five;
    var picture_six = this.props.data.picture_six;

    var token_passed_from_main = this.props.token_to_pass_on;

    var self = this;

    var update_reach_url = `http://localhost:8080/social_reach/profiles`

    axios.put(`http://localhost:8080/social_reach/profiles/${username}/?format=json`, {
     'user': user,
     'name': name,
     'bio': bio,
     'looking_for': looking_for,
     'date_of_birth': date_of_birth,
     'gender_identity': gender,
     'location': location,
     'picture': picture_one,
     'picture_two': picture_two,
     'picture_three': picture_three,
     'picture_four': picture_four,
     'picture_five': picture_five,
     'picture_six': picture_six,
     'instagram_handle': instagram_handle,
     'twitter_handle': twitter_handle,
     'youtube_handle': youtube_handle,
     'instagram_followers': instagram_followers,
     'twitter_followers': twitter_followers,
     'youtube_followers': youtube_followers
   },
 { headers: { 'Authorization': `JWT ${token_passed_from_main}` } }).then(function (response) {
    self.setState({
      reachUpdated: true
    })
    console.log("REACH UPDATED");
}).catch(function(error){
console.log(error);
console.log("Error updating Reach.");
})
}

  render(){

    return(

      <div className="pulsating-circle" onClick={this.updateReach}>Update My Reach!</div>

    )
  }
}


export default Update;
