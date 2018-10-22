import React, { Component } from "react";
import $ from 'jquery';
import jQuery from 'jquery'
import {geolocated, geoPropTypes} from 'react-geolocated';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: this.props.login,
      data: {},
    };
  }

  twitter_followers(){return this.props.data.twitter_followers;}
  instagram_followers(){return this.props.data.instagram_followers;}
  youtube_followers(){return this.props.data.youtube_followers;}
  total_reach(){return this.props.data.instagram_followers + this.props.data.twitter_followers + this.props.data.youtube_followers}


  render(){

    const imageStyle = {backgroundImage: `url(${this.props.data.picture})`}
    const imageStyle2 = {backgroundSize: "cover", backgroundImage: `url(${this.props.data.picture_two})`}
    const imageStyle3 = {backgroundImage: `url(${this.props.data.picture_three})`}
    const imageStyle4 = {backgroundImage: `url(${this.props.data.picture_four})`}
    const imageStyle5 = {backgroundImage: `url(${this.props.data.picture_five})`}
    const imageStyle6 = {backgroundImage: `url(${this.props.data.picture_six})`}
    var getAge = require('get-age');
    var age = getAge(this.props.data.date_of_birth);

//ternary to either display profile or log in message
  const post = this.props.loggedInAs  ? (


      <div className="profile">

        {/* DISPLAY NAME & AGE*/}
        <fieldset>
          <legend><span class="number"></span> {this.props.loggedInAs} ({this.props.data.location}), {age}yrs </legend>
          <label className="total-reach" type="text">Reach: {this.total_reach()}</label>
        </fieldset>

      {/* PHOTO CAROUSEL */}
          <div class="slider-container">
            <div class="slider-menu"> */}
              {/* <label for="slide-dot-1"></label> */}
              <label for="slide-dot-2"></label>
              <label for="slide-dot-3"></label>
              <label for="slide-dot-4"></label>
              <label for="slide-dot-5"></label>
              <label for="slide-dot-6"></label>
            </div>

            {/* <input id="slide-dot-1" type="radio" name="slides" checked></input>
            <div class="slide slide-1" style={imageStyle}></div> */}

            /* <input id="slide-dot-2" type="radio" name="slides"></input>
            <div class="slide slide-2" style={imageStyle2}></div>

            <input id="slide-dot-3" type="radio" name="slides"></input>
            <div class="slide slide-3" style={imageStyle3}></div>

            <input id="slide-dot-4" type="radio" name="slides"></input>
            <div class="slide slide-4" style={imageStyle4}></div>

            <input id="slide-dot-5" type="radio" name="slides"></input>
            <div class="slide slide-5" style={imageStyle5}></div>

            <input id="slide-dot-6" type="radio" name="slides"></input>
            <div class="slide slide-6" style={imageStyle6}></div>
          </div>
          <br></br>


          {/* REACH STATS (I.E PERCENTAGE INFO-GRAPHIC) */}
          <div className="reach-stats">
          <ul class="os-percentages horizontal-list">
              <li>
                <p class="twitter os scnd-font-color">Twitter</p>
                <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.twitter_followers())}<sup>%</sup></p>
              </li>
              <li>
                <p class="instagram os scnd-font-color">Instagram</p>
                <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.instagram_followers())}<sup>%</sup></p>
              </li>
              <li>
                <p class="youtube os scnd-font-color">YouTube</p>
                <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.youtube_followers())}<sup>%</sup></p>
              </li>
              <li>
                <p class="facebook os scnd-font-color">Facebook</p>
                <p class="os-percentage">0<sup>%</sup></p>
              </li>
              <li>
                <p class="snapchat os scnd-font-color">Snapchat</p>
                <p class="os-percentage">0<sup>%</sup></p>
              </li>
              <li>
                <p class="spotify os scnd-font-color">Spotify</p>
                <p class="os-percentage">0<sup>%</sup></p>
              </li>
          </ul>
        </div>
        <br></br><br></br>

          {/* YES OR NO BUTTONS   */}
          <fieldset>
            <div class="buttonHolder">
              <a href="#" class="button tick"></a>
              <a href="#" class="button cross"></a>
            </div>
          </fieldset>


        {/* DISPLAY HOMETOWN & BIO OF USER*/}
        <br></br>
        <fieldset>
          <legend><span class="number"></span>About</legend>
          <label type="text">{this.props.data.bio}</label>
        </fieldset>

      </div>





  ) : (
    <div className="center"> Oops! Sorry. You need to log in :) </div>
  )

  return(
    <div className="container">
    {post}
    </div>

    )
  }
}


export default geolocated()(Profile);
