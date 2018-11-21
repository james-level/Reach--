import React, { Component } from "react";
import $ from 'jquery';
import jQuery from 'jquery'
import {geolocated, geoPropTypes} from 'react-geolocated';
import StackedBar from './Stacked';
import ReachPercentagesTable from './ReachPercentagesTable';
import Gallery from './Gallery';
import axios from 'axios';

// DELETE THIS COMMENT  DURING MERE PLEASE


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: this.props.login,
      data: {},
      longitude: 0,
      latitude: 0
    };
  }

  twitter_followers(){return this.props.data.twitter_followers;}
  instagram_followers(){return this.props.data.instagram_followers;}
  youtube_followers(){return this.props.data.youtube_followers;}
  total_reach(){


     return this.props.data.instagram_followers + this.props.data.twitter_followers + this.props.data.youtube_followers;

   }


  componentDidMount(){
    this.getLocation()

    }

  getLocation(){
    console.log("getting location");

var self = this
const token_passed_from_main = this.props.token_to_pass_on;
const username = this.props.loggedInAs;
  navigator.geolocation.getCurrentPosition(function(position) {
    if (position.coords.latitude && position.coords.longitude) {
      const formData = new FormData();
     self.setState({
       longitude: position.coords.longitude ,
       latitude: position.coords.latitude
     })

     formData.append('latitude', self.state.latitude);
     formData.append('longitude', self.state.longitude);
     var session_url = 'http://localhost:8080/social_reach/jwt_login/';
     axios.post(session_url, {
         'username': username,
         'password': self.props.password
       }).then(function(response) {
         console.log('response:', response);
       console.log('Obtained token. (PROFILE)');
       var token = response.data['token']
       axios.post(`http://localhost:8080/social_reach/auth-jwt-verify/`,  {
           "token": token,
           'username': username,
           'password': self.props.password
         }).then(function(second_response) {
     axios.patch(`http://localhost:8080/social_reach/profiles/${username}/`,
       formData
    ,
  { headers: { 'Authorization': `JWT ${token}` , 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' } }).then(function (response) {

     console.log("location UPDATED");
 }).catch(function(error){
 console.log(error);
 console.log("Error updating Reach.");
}).catch(function (error){
  console.log(error);
})})})

   }
  });
}


  render(){

    console.log(this.props.coords);

    const commaNumber = require('comma-number')

    var getAge = require('get-age');
    var age = getAge(this.props.data.date_of_birth);


//ternary to either display profile or log in message
  const post = this.props.loggedInAs  ? (


      <div className="profile">

        {/* DISPLAY NAME & AGE*/}
        <fieldset>
          <legend><span class="number"></span> {this.props.data.name} ({this.props.data.location}), {age}yrs </legend>
          <label className="total-reach" type="text">Reach: {commaNumber(this.total_reach())}</label>
        </fieldset>

      {/* PHOTO CAROUSEL */}
      <Gallery

      data={this.props.data}

      />
           <br></br>


        <StackedBar twitter={this.twitter_followers()} youtube={this.youtube_followers()} instagram={this.instagram_followers()} totalReach={this.total_reach()} />
        <br></br>


          {/* REACH STATS (I.E PERCENTAGE INFO-GRAPHIC) */}

          <ReachPercentagesTable

           total_reach={this.total_reach()}
           youtube_followers={this.youtube_followers()}
           instagram_followers={this.instagram_followers()}
           twitter_followers={this.twitter_followers()}

          / >


        {/* DISPLAY HOMETOWN & BIO OF USER*/}
        <br></br>
        <div>
          <legend><span class="number"></span>About</legend>
          <label type="text">{this.props.data.bio}</label>
        </div>

        {/* <div>
          <legend><span class="number"></span>Further Info:</legend>
          <label type="text">Interests: 🥃 🇬🇧 ⚽️ 🥑 😬 </label>
          <label type="text">Distance: [ x ] miles (from you)</label>
          <label type="text">Liked by: {this.props.data.likes} people</label>
        </div>
 */}

      </div>


  ) : (
    <div className="center"> Oops! Sorry - You need to log in  </div>
  )

  return(
    <div className="container">
    {post}
    </div>

    )
  }
}


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Profile);
