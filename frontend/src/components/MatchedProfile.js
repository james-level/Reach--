import React, { Component } from "react";
import $ from 'jquery';
import jQuery from 'jquery'
import {geolocated, geoPropTypes} from 'react-geolocated';
import StackedBar from './Stacked';
import ReachPercentagesTable from './ReachPercentagesTable';
import axios from 'axios';


class MatchedProfile extends Component {
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


  render(){

    console.log(this.props.coords);

    const commaNumber = require('comma-number')
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

       <button onClick={this.props.resetMatchingState} class="back-to-results-button">Back To Results</button>

        {/* DISPLAY NAME & AGE*/}
        <fieldset>
          <legend><span class="number"></span> {this.props.data.name} ({this.props.data.location}), {age}yrs </legend>
          <label className="total-reach" type="text">Reach: {commaNumber(this.total_reach())}</label>
          <label className="distance_from_user" type="text"> {this.props.distance}km away</label>
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
})(MatchedProfile);
