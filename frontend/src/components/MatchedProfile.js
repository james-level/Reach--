import React, { Component } from "react";
import $ from 'jquery';
import jQuery from 'jquery'
import {geolocated, geoPropTypes} from 'react-geolocated';
import StackedBar from './Stacked';
import ReachPercentagesTable from './ReachPercentagesTable';
import Gallery from './Gallery';
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


   galleryDots(user){

     var imageArray = [user.picture, user.picture_two, user.picture_three, user.picture_four, user.picture_five, user.picture_six];

     const galleryDots = imageArray.filter(image => image !== null).map(image =>{

     return (

         <label for={`slide-dot-` + imageArray.indexOf(image)}> </label>

       )
     }
   )

     return galleryDots;

   }


  render(){

    console.log(this.props.coords);

    const commaNumber = require('comma-number')

    var getAge = require('get-age');
    var age = getAge(this.props.data.date_of_birth);


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
      
      <Gallery

      data={this.props.data}
      gallery_dots={this.galleryDots(this.props.data)}

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
})(MatchedProfile);
