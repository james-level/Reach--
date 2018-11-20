import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import StackedBar from './Stacked';
import MatchAnimation from './MatchAnimation';
import Indicator from './Indicator';
import { Redirect } from 'react-router-dom'

class ResultsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
      data: {},
      min_age: this.props.data.min_age_desired,
      max_age: this.props.data.max_age_desired,
      my_profile: "",
      entered_search_query: false,
      query_results: null,
      distance: this.props.data.max_distance_acceptable,
      liked_profiles: this.props.data.liked_profiles.length > 0 ? this.props.data.liked_profiles : [] ,
      ignored_profiles: this.props.data.ignored_profiles.length > 0 ? this.props.data.ignored_profiles : [],
      matchInProgress: false,
      liked_profile: null
    };


      this.handleChange = this.handleChange.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.swipdeDeck = this.swipdeDeck.bind(this);
      this.handleLike = this.handleLike.bind(this);
      this.handleIgnore = this.handleIgnore.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.launchMatchAnimation = this.launchMatchAnimation.bind(this);
      this.preAnimationLikedProfileState = this.preAnimationLikedProfileState.bind(this);
      
  }


  handleChange(evt){
     this.setState({
       [evt.target.name]: parseInt(evt.target.value)
     })
  }


  approxDistanceBetweenTwoPoints(lat1, long1, lat2, long2){

    var R = 6371.0

    var lat1_rad = lat1 * (Math.PI / 180)
    var long1_rad = long1 * (Math.PI / 180)
    var lat2_rad = lat2 * (Math.PI / 180)
    var long2_rad = long2 * (Math.PI / 180)

    var dlong = long2_rad - long1_rad
    var dlat = lat2_rad - lat1_rad

    var a = Math.sin(dlat / 2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlong / 2)**2
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    var distance = R * c

    return distance

  }

  fireSearchRequest(){

    var min_age = this.state.min_age;
    var max_age = this.state.max_age;
    // var max_distance = this.state.distance;
    var max_distance = 100000;
    var filtering_url = `http://localhost:8080/social_reach/profiles/${this.props.loggedInAs}/minage=${min_age}/maxage=${max_age}/maxdistance=${max_distance}/?format=json`;
      axios.get(filtering_url)
      .then(res =>{
        this.setState({
          entered_search_query: true,
          query_results: res.data,
        })
      console.log("Retrieved results.");
      console.log("SMOKER STATUS", res.data[2].non_smoker);
      }
    ).catch(function(error){
        })
  }

  getLocation(username, password){

    console.log("getting location");

  var self = this
  const token_passed_from_main = this.props.token_to_pass_on;
  navigator.geolocation.getCurrentPosition(function(position) {
    if (position.coords.latitude && position.coords.longitude) {
      const formData = new FormData();
     self.setState({
       longitude: position.coords.longitude,
       latitude: position.coords.latitude
     })
     formData.append('latitude', self.state.latitude);
     formData.append('longitude', self.state.longitude);
     var session_url = 'http://localhost:8080/social_reach/jwt_login/';
     axios.post(session_url, {
         'username': username,
         'password': password
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
    self.obtainUserPreferencesFromAPI()
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

obtainUserPreferencesFromAPI(){

  this.setState({
  min_age: this.props.data.min_age_desired,
  max_age: this.props.data.max_age_desired,
  distance: this.props.max_distance_acceptable,
  my_profile: this.props.loggedInAs},
  function(){this.fireSearchRequest()})
}

  componentDidMount(evt){

    console.log("USERNAME", this.props.loggedInAs);
    console.log("PASSWORD", this.props.password);
    const username = this.props.loggedInAs;
    const password = this.props.password;

    this.getLocation(username, password);

    this.setState({
    liked_profiles: this.props.data.liked_profiles,
    ignored_profiles: this.props.data.ignored_profiles,
    matchInProgress: false
  })

  }


  saveLikesAndIgnores(cardsCounter){

      console.log("Liked profiles state", this.state.liked_profiles);

    var username = this.props.loggedInAs;
    var token_passed_from_main = this.props.token_to_pass_on;
    console.log(this.props.token_to_pass_on);
    var liked_profile_ids = this.state.liked_profiles
    var ignored_profile_ids = this.state.ignored_profiles

    console.log("IGNORED IDS", ignored_profile_ids);
    console.log("LIKED IDS", liked_profile_ids);

    var self = this;

    var update_reach_url = `http://localhost:8080/social_reach/profiles/`


    if (liked_profile_ids.length > 0 && ignored_profile_ids.length > 0){
    var request_dict = {'liked_profiles': liked_profile_ids, 'ignored_profiles': ignored_profile_ids};
  }

    else if (ignored_profile_ids.length > 0){
    var request_dict = {'ignored_profiles': ignored_profile_ids};
  }

    else if (liked_profile_ids.length > 0){
    var request_dict = {'liked_profiles': liked_profile_ids};
  }

  var cardsCounter = cardsCounter;

  console.log("cardsCounter", cardsCounter);

    axios.patch(`http://localhost:8080/social_reach/profiles/${username}/`,
      request_dict
   ,
 { headers: { 'Authorization': `JWT ${token_passed_from_main}`} }).then(function (response) {

    self.checkForMutualLike(cardsCounter);

    console.log("LIKES AND IGNORES UPDATED");
}).catch(function(error){
console.log(error);
console.log("Error updating likes and ignores.");
})
}


  handleLike(cardsCounter){

    console.log("CARDS COUNTER", cardsCounter);

    var likedProfile = this.state.query_results[cardsCounter].user;

    console.log("likedProf", likedProfile);

    console.log("QUERY RESULTS AT INDEX", likedProfile);

    if (this.state.liked_profiles.length > 0){

      console.log("HEREEEEEE");

    this.setState(
      {
      liked_profiles: [...this.state.liked_profiles, likedProfile]
    }, function(){this.saveLikesAndIgnores(cardsCounter)})
  }

  else {

    this.setState(
      {
      liked_profiles: [likedProfile]
    }, function(){this.saveLikesAndIgnores(cardsCounter)})
  }

  }


  handleIgnore(cardsCounter){

    console.log("CARDS COUNTER", cardsCounter);

    var ignoredProfile = this.state.query_results[cardsCounter].user;
        console.log("QUERY RESULTS AT INDEX", ignoredProfile);

        if (this.state.ignored_profiles.length > 0){

        this.setState (
          {
          ignored_profiles: [...this.state.ignored_profiles, ignoredProfile]
        }, function(){this.saveLikesAndIgnores(cardsCounter)})

      }

      else {

        this.setState (
          {
          ignored_profiles: [ignoredProfile]
        }, function(){this.saveLikesAndIgnores(cardsCounter)})

      }

      }

launchMatchAnimation(){

  console.log('MATCH IN PROGRESS BEING SET TO TRUE');

  this.setState({

    matchInProgress: true

  })
}

preAnimationLikedProfileState(liked_profile){

  console.log('setting state for liked profile!!');

  this.setState({

    liked_profile: liked_profile

  }, function(){
    this.launchMatchAnimation()
  }
)
}

createMutualLike(likedProfile, liker){

  var self = this;

  var liked = likedProfile.user;
  var liker = liker;

  var liked_profile = likedProfile;

  console.log("running mutual liker creator method");

  var username = this.props.loggedInAs;
  var token_passed_from_main = this.props.token_to_pass_on;

  const formData = new FormData();
  formData.append('first_user', liker);
  formData.append('second_user', liked);

  var session_url = 'http://localhost:8080/social_reach/jwt_login/';

  axios.post(session_url, {
      'username': username,
      'password':  self.props.password
    }).then(function(response) {
    console.log('response:', response);
    console.log('Obtained token. (PROFILE)');
    var token = response.data['token']
    axios.post(`http://localhost:8080/social_reach/auth-jwt-verify/`,  {
        "token": token,
        'username': username,
        'password': self.props.password
      }).then(function(second_response) {
  axios.post(`http://localhost:8080/social_reach/mutual_likes/`,
    formData
 ,
{ headers: { 'Authorization': `JWT ${token}` , 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' } }).then(function (response) {
 self.preAnimationLikedProfileState(liked_profile)
  console.log("MUTUAL LIKE CREATED");
}).catch(function(error){
console.log(error);
console.log("Error making mutual like object.");
}).catch(function (error){
console.log(error);
})})})

}


checkForMutualLike(cardsCounter){

  console.log("mutual lker checker in action", cardsCounter);

  var likedUserId = this.state.query_results[cardsCounter];
  var likerId = this.props.data.user;

  console.log("LIKED", likedUserId);

  if (likedUserId){
  if (likedUserId.liked_profiles.includes(likerId)){
    console.log("Liked user likes you back");
    this.createMutualLike(likedUserId, likerId)
  }
}

else {
  return
}

}


    returnParentStatus(user){
      if (user.childless === false){
        return '👼'
      }
      else {
        return '🙅‍♀️'
      }
    }

    returnDiet(user){
      if (user.vegan === false){
        return '🍕'
      }
      else {
        return '🥗'
      }
    }


    returnGymStatus(user){
      if (user.prefers_chill_to_gym === false){
        return '💪'
      }
      else {
        return '🧘‍♀️'
      }
    }

  returnSmokerStatus(user){
    if (user.non_smoker === false){
      return '🚬'
    }
    else {
      return '🚭'
    }
  }


// SWIPE DECK 3 FUNCTION WORDS
  swipdeDeck(numberOfResults) {

  const self = this;

    $(document).ready(function() {

  var animating = false;
  var cardsCounter = 0;
  var numOfCards = numberOfResults;
  console.log("RESULTS", numberOfResults);
  var decisionVal = 80;
  var pullDeltaX = 0;
  var deg = 0;
  var $card, $cardReject, $cardLike;


  function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $card.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");

    var opacity = pullDeltaX / 100;
    var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
    var likeOpacity = (opacity <= 0) ? 0 : opacity;
    $cardReject.css("opacity", rejectOpacity);
    $cardLike.css("opacity", likeOpacity);
  };

  function release() {

    if (pullDeltaX >= decisionVal) {
      $card.addClass("to-right");
      // Add current card to liked profiles array in state
      // self.handleLike(cardsCounter);
      // self.setState({
      //   liked_profiles: [...state.liked_profiles, state.query_results[cardsCounter]]
      // })
    } else if (pullDeltaX <= -decisionVal) {
      $card.addClass("to-left");
      // Add current card to ignored profiles array in state
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
      $card.addClass("inactive");

      setTimeout(function() {
        $card.addClass("below").removeClass("inactive to-left to-right");
        // Adding profile to liked array if pull delta exceeds decisive value
        if (pullDeltaX >= decisionVal) {
            self.handleLike(cardsCounter);
          }

        if (pullDeltaX <=  -decisionVal) {
            self.handleIgnore(cardsCounter);
          }

        // self.saveLikesAndIgnores();

        cardsCounter++;

        if (cardsCounter === numOfCards) {
          cardsCounter = 0;
          $(".demo__card").removeClass("below");
        }
      }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
      $card.addClass("reset");
    }

    setTimeout(function() {
      $card.attr("style", "").removeClass("reset")
        .find(".demo__card__choice").attr("style", "");

      pullDeltaX = 0;
      animating = false;
    }, 300);
  };

  $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(e) {
    console.log("MOUSEDOWN TOUCHDOWN RUNNING");
    e.stopImmediatePropagation();
    if (animating) return;

    $card = $(this);
    $cardReject = $(".demo__card__choice.m--reject", $card);
    $cardLike = $(".demo__card__choice.m--like", $card);
    var startX =  e.pageX || e.originalEvent.touches[0].pageX;

    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      pullDeltaX = (x - startX);
      if (!pullDeltaX) return;
      pullChange();
    });

    $(document).on("mouseup touchend", function() {
      $(document).off("mousemove touchmove mouseup touchend");
      if (!pullDeltaX) return; // prevents from rapid click events
      console.log("ABOUT TO CALL RELEASE");
      release();
    });
  });

})};
// SWIPE DECK 3 FUNCTION ENDS



  total_reach(instagram_followers, twitter_followers, youtube_followers){return instagram_followers + twitter_followers + youtube_followers}

  render(){

      console.log("MATCH IN PROGRESS STATE IS", this.state.matchInProgress);
      const commaNumber = require('comma-number')
      const getAge = require('get-age');

      if (this.state.query_results){
        this.swipdeDeck(this.state.query_results.length);
      }

        if (!this.props.loggedInAs) {

          return (

            <div className="center"> Oops! You need to log in </div>
          )

        }

      if (this.state.query_results && this.state.matchInProgress === false) {

        return(
        <div className="container">

        {/* SWIPEDECK NO.3 START */}

          <div class="demo">
            <header class="demo__header"></header>
              <div class="demo__content">
                <div class="demo__card-cont">

                  {this.state.query_results.map(user =>

                  <div class="demo__card">
                    <div class="demo__card__top">

  {/* Putting profile card div here for testing */}

  <div className="profile" style={{maxWidth:'600'}}>

    {/* DISPLAY NAME & AGE*/}
    <fieldset>
      <legend><span class="number"></span> {user.name}, from {user.location}, {getAge(user.date_of_birth)}yrs</legend>
      <label className="total-reach" type="text">Reach: {commaNumber(this.total_reach(user.instagram_followers, user.twitter_followers, user.youtube_followers))}</label>
      <label className="distance_from_user" type="text"> {this.approxDistanceBetweenTwoPoints(this.state.latitude, this.state.longitude, user.latitude, user.longitude).toFixed(1)}km away</label>
    </fieldset>

  {/* PHOTO CAROUSEL */}
      <div class="slider-container">
        <div class="slider-menu">
          <label for="slide-dot-1"></label>
          <label for="slide-dot-2"></label>
          <label for="slide-dot-3"></label>
          <label for="slide-dot-4"></label>
          <label for="slide-dot-5"></label>
          <label for="slide-dot-6"></label>
        </div>

         <input id="slide-dot-1" type="radio" name="slides"></input>
        <div class="slide slide-1" style={{backgroundImage: `url(${user.picture_six})`}}></div>

        <input id="slide-dot-2" type="radio" name="slides"></input>
         <div class="slide slide-2" style={{backgroundImage: `url(${user.picture_two})`}}></div>

         <input id="slide-dot-3" type="radio" name="slides"></input>
         <div class="slide slide-3" style={{backgroundImage: `url(${user.picture_three})`}}></div>

         <input id="slide-dot-4" type="radio" name="slides"></input>
         <div class="slide slide-4" style={{backgroundImage: `url(${user.picture_four})`}}></div>

         <input id="slide-dot-5" type="radio" name="slides"></input>
         <div class="slide slide-5" style={{backgroundImage: `url(${user.picture_five})`}}></div>

         <input id="slide-dot-6" type="radio" name="slides"></input>
         <div class="slide slide-6" style={{backgroundImage: `url(${user.picture})`}}></div>
       </div>
       <br></br>

    <StackedBar twitter={user.twitter_followers} youtube={user.youtube_followers} instagram={user.instagram_followers} totalReach={this.total_reach(user.instagram_followers, user.twitter_followers, user.youtube_followers)} />
    <br></br>


      {/* REACH STATS (I.E PERCENTAGE INFO-GRAPHIC) */}
      <div className="reach-stats">
      <div className="reach_table">
      <ul class="os-percentages horizontal-list">
          <li>
            {/* <p class="youtube os scnd-font-color">Youtube</p> */}
            <p class="youtube os scnd-font-color"><img src="../images/app_images/youtube-icon.png" height="30" width="30"></img></p>
            <p class="os-percentage">{Math.floor((100/this.total_reach(user.instagram_followers, user.twitter_followers, user.youtube_followers)) * user.youtube_followers)}<sup>%</sup></p>
          </li>
          <li>
            <p class="twitter os scnd-font-color"><img src="../images/app_images/twitter-icon.png" height="30" width="30"></img></p>
            <p class="os-percentage">{Math.floor((100/this.total_reach(user.instagram_followers, user.twitter_followers, user.youtube_followers)) * user.twitter_followers)}<sup>%</sup></p>
          </li>
          <li>
            <p class="instagram os scnd-font-color"><img src="../images/app_images/instagram-icon.png" height="30" width="30"></img></p>
            <p class="os-percentage">{Math.floor((100/this.total_reach(user.instagram_followers, user.twitter_followers, user.youtube_followers)) * user.instagram_followers)}<sup>%</sup></p>
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


    {/* DISPLAY HOMETOWN & BIO OF USER*/}
    <br></br>

    <div>
      <legend><span class="number"></span>About</legend>
      <label type="text">{user.bio}</label>
    </div>
  </div>

  {/* End */}
                      <div class="demo__card__img"><img src="{user.picture}"></img></div>

                    </div>
                    <div class="demo__card__btm">

                    </div>
                     <div class="demo__card__choice m--reject"></div>
                     <div class="demo__card__choice m--like"></div>
                     <div class="demo__card__drag"></div>
                   </div>)}

                </div>

              </div>
              </div>

        {/* SWIPEDECK NO.3 END */}
  </div>

  // {this.approxDistanceBetweenTwoPoints(this.props.data.latitude, this.props.data.longitude, user.latitude, user.longitude).toFixed(1)}km from you!

  // BELOW DISPLAYS RESULTS (WHEN USER HITS 'SUBMIT"')
    // <div>
    // <p>User {user.user} - their name is {user.name}</p>
    // <p>{user.bio}</p>
    // <h4>{this.approxDistanceBetweenTwoPoints(this.props.data.latitude, this.props.data.longitude, user.latitude, user.longitude).toFixed(2)}km from you!</h4>
    // <br></br>
    // <p>{user.instagram_followers} is their Instagram Reach!</p>
    // <p>They self-rated as {user.gender_identity} on the gender continuum!</p>
    // <br></br>
    // <img src={`http://localhost:8080/social_reach/media/${user.picture}`}/>
    // <br></br>
    // <p>Go check out this user, {this.props.loggedInAs}!</p>
    // <br></br>
    // </div>



  )}

  if (this.state.matchInProgress === true){

    console.log("CONDITIONAL RENDER FOR MATCH IN PROGRESS BEING EXECUTED");
    console.log("LIKED PROFILE STATE", this.state.liked_profile);

    localStorage.setItem('liked_profile',
  JSON.stringify(this.state.liked_profile));

  localStorage.setItem('liked_user_picture',
JSON.stringify(this.state.liked_profile.picture));

localStorage.setItem('liked_user_name',
JSON.stringify(this.state.liked_profile.name));

localStorage.setItem('liked_user_location',
JSON.stringify(this.state.liked_profile.location));

    return (

    <MatchAnimation

     data={this.props.data} loggedInAs={this.props.loggedInAs} likedUser={this.state.liked_profile} distance={this.approxDistanceBetweenTwoPoints(this.state.latitude, this.state.longitude, this.state.liked_profile.latitude, this.state.liked_profile.longitude).toFixed(1)} login= {true}

     />

    )
  }

else {
  return (

      <Indicator/>

    )
}



}




                  }



export default ResultsView;
