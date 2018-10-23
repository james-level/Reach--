import React, { Component } from "react";
import $ from 'jquery';
import jQuery from 'jquery'
import {geolocated, geoPropTypes} from 'react-geolocated';
import StackedBar from './Stacked';




class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: this.props.login,
      data: {},
      chart: false
    };
  }

twitter_followers(){
  return this.props.data.twitter_followers;
}

instagram_followers(){
  return this.props.data.instagram_followers;
}

youtube_followers(){
  return this.props.data.youtube_followers;
}

// REACH DONUT DISPLAY GRAPHIC START

// REACH DONUT DISPLAY GRAPHIC END

  total_reach(){
    return this.props.data.instagram_followers + this.props.data.twitter_followers + this.props.data.youtube_followers
  }


  render(){
    console.log(this.props.coords);
    var getAge = require('get-age');
    var age = getAge(this.props.data.date_of_birth);
    console.log("age:",age);
    console.log(this.props);



//ternary to either display profile or log in message
  const post = this.props.loggedInAs  ? (

      <div className="profile">

        <fieldset>
          <legend><span class="number"></span> </legend>
            <div class="gallery" data-flickity='{ "cellAlign": "left", "contain": true }'>
              <img src={`http://localhost:8080/social_reach/media/${this.props.data.picture}`}/>
              <img src={this.props.data.picture_two}/>
              <img src={this.props.data.picture_three}/>
              <img src={this.props.data.picture_four}/>
              <img src={this.props.data.picture_five}/>
              <img src={this.props.data.picture_six}/>
            </div>
        </fieldset>
        <br></br>


        <fieldset>
          <legend><span class="number"></span> {this.props.loggedInAs}, {age} </legend>
          <label type="text">{this.props.data.bio}</label>
        </fieldset>

        <StackedBar twitter={this.twitter_followers()} youtube={this.youtube_followers()} instagram={this.instagram_followers()} totalReach={this.total_reach()} />

{/* PIE CHART START  */}
        <fieldset class="social_reach_stats">
          <div class="donut-chart-block block">



            <ul class="os-percentages horizontal-list">
                <li>
                  <p class="youtube os scnd-font-color">Youtube</p>
                  <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.youtube_followers())}<sup>%</sup></p>
                </li>
                <li>
                  <p class="twitter os scnd-font-color">Twitter</p>
                  <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.twitter_followers())}<sup>%</sup></p>
                </li>
                <li>
                  <p class="instagram os scnd-font-color">Instagram</p>
                  <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.instagram_followers())}<sup>%</sup></p>
                </li>

            </ul>
          </div>
        </fieldset>
{/* PIE CHART END  */}

      </div>

  ) : (
    <div className="center"> Oops! You need to log in :) </div>
  )

  return(
    <div className="container">
    {post}
    </div>

    )
  }
}







export default geolocated()(Profile);
