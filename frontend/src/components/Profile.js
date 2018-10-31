import React, { Component } from "react";
import $ from 'jquery';
import jQuery from 'jquery'
import {geolocated, geoPropTypes} from 'react-geolocated';
import StackedBar from './Stacked';
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
  total_reach(){return this.props.data.instagram_followers + this.props.data.twitter_followers + this.props.data.youtube_followers}


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







    const imageStyle = {backgroundImage: `url(${this.props.data.picture_six})`}
    const imageStyle2 = { backgroundImage: `url(${this.props.data.picture_two})`}
    const imageStyle3 = {backgroundImage: `url(${this.props.data.picture_three})`}
    const imageStyle4 = {backgroundImage: `url(${this.props.data.picture_four})`}
    const imageStyle5 = {backgroundImage: `url(${this.props.data.picture_five})`}
    const imageStyle6 = {backgroundImage: `url(${this.props.data.picture})`}
    const imageArray = [this.props.data.picture, this.props.data.picture_two, this.props.data.picture_three, this.props.data.picture_four, this.props.data.picture_five, this.props.data.picture_six]
    console.log(imageArray);
    console.log("PHOTO 1", this.props.data.picture);
    console.log("PHOTO 2", this.props.data.picture_two);
    console.log("PHOTO 3", this.props.data.picture_three);
    console.log("PHOTO 4", this.props.data.picture_four);
    console.log("PHOTO 5", this.props.data.picture_five);
    console.log("PHOTO 6", this.props.data.picture_six);
    var getAge = require('get-age');
    var age = getAge(this.props.data.date_of_birth);

    var galleryElements = imageArray.filter(image => image !== null) ;
    console.log(galleryElements);
    const GalleryDots = galleryElements.map(image =>{
      var dot = `slide-dot-` + imageArray.indexOf(image)
      return (
          <label for={dot}> </label>)
    })

      // )


//ternary to either display profile or log in message
  const post = this.props.loggedInAs  ? (


      <div className="profile">

        {/* DISPLAY NAME & AGE*/}
        <fieldset>
          <legend><span class="number"></span> {this.props.data.name} ({this.props.data.location}), {age}yrs </legend>
          <label className="total-reach" type="text">Reach: {this.total_reach()}</label>
        </fieldset>

      {/* PHOTO CAROUSEL */}
          <div class="slider-container">
            <div class="slider-menu">
              {GalleryDots }
            </div>

             <input id="slide-dot-0" type="radio" name="slides"></input>
            <div class="slide slide-1" style={imageStyle}></div>

            <input id="slide-dot-1" type="radio" name="slides"></input>
             <div class="slide slide-2" style={imageStyle2}></div>

             <input id="slide-dot-2" type="radio" name="slides"></input>
             <div class="slide slide-3" style={imageStyle3}></div>

             <input id="slide-dot-3" type="radio" name="slides"></input>
             <div class="slide slide-4" style={imageStyle4}></div>

             <input id="slide-dot-4" type="radio" name="slides"></input>
             <div class="slide slide-5" style={imageStyle5}></div>

             <input id="slide-dot-5" type="radio" name="slides"></input>
             <div class="slide slide-6" style={imageStyle6}></div>
           </div>
           <br></br>


        <StackedBar twitter={this.twitter_followers()} youtube={this.youtube_followers()} instagram={this.instagram_followers()} totalReach={this.total_reach()} />
        <br></br>


          {/* REACH STATS (I.E PERCENTAGE INFO-GRAPHIC) */}
          <div className="reach-stats">
          <div className="reach_table">
          <ul class="os-percentages horizontal-list">
              <li>
                {/* <p class="youtube os scnd-font-color">Youtube</p> */}
                <p class="youtube os scnd-font-color"><img src="../images/app_images/youtube-icon.png" height="30" width="30"></img></p>
                <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.youtube_followers())}<sup>%</sup></p>
              </li>
              <li>
                <p class="twitter os scnd-font-color"><img src="../images/app_images/twitter-icon.png" height="30" width="30"></img></p>
                <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.twitter_followers())}<sup>%</sup></p>
              </li>
              <li>
                <p class="instagram os scnd-font-color"><img src="../images/app_images/instagram-icon.png" height="30" width="30"></img></p>
                <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.instagram_followers())}<sup>%</sup></p>
              </li>
              <li>
                <p class="facebook os scnd-font-color"><img src="../images/app_images/facebook-icon.png" height="30" width="30"></img></p>
                <p class="os-percentage">0<sup>%</sup></p>
              </li>
              <li>
                <p class="snapchat os scnd-font-color"><img src="../images/app_images/snapchat-icon.png" height="30" width="30"></img></p>
                <p class="os-percentage">0<sup>%</sup></p>
              </li>
              <li>
                <p class="spotify os scnd-font-color"><img src="../images/app_images/spotify-icon.png" height="30" width="30"></img></p>
                <p class="os-percentage">0<sup>%</sup></p>
              </li>
          </ul>
          </div>

        </div>
        <br></br><br></br>

          {/* YES OR NO BUTTONS   */}

            {/* <div class="buttonHolder">
              <a href="#" class="button tick"></a>
              <a href="#" class="button cross"></a>
            </div>
 */}


        {/* DISPLAY HOMETOWN & BIO OF USER*/}
        <br></br><br></br><br></br>

        <div>
          <legend><span class="number"></span>About</legend>
          <label type="text">{this.props.data.bio}</label>
        </div>

        <div>
          <legend><span class="number"></span>Further Info:</legend>
          <label type="text">Interests: 🥃 🇬🇧 ⚽️ 🥑 😬 </label>
          <label type="text">Distance: [ x ] miles (from you)</label>
          <label type="text">Liked by: {this.props.data.likes} people</label>
        </div>


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


export default geolocated()(Profile);
