import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import StackedBar from './Stacked';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
      data: {},
      min_age: 0,
      max_age: 99,
      entered_search_query: false,
      query_results: null,
      distance: 0
    };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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


  handleSubmit(evt){
    evt.preventDefault();
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
      }).catch(function(error){
          console.log(error);
          console.log("Error retrieving profiles.");
        })
  }

// SWIPE DECK 3 FUNCTION WORDS
  swipdeDeck() {
    $(document).ready(function() {

  var animating = false;
  var cardsCounter = 0;
  var numOfCards = 6;
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
    } else if (pullDeltaX <= -decisionVal) {
      $card.addClass("to-left");
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
      $card.addClass("inactive");

      setTimeout(function() {
        $card.addClass("below").removeClass("inactive to-left to-right");
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
      release();
    });
  });

});
// SWIPE DECK 3 FUNCTION ENDS
  }


  total_reach(instagram_followers, twitter_followers, youtube_followers){return instagram_followers + twitter_followers + youtube_followers}

  render(){


      const getAge = require('get-age');


      this.swipdeDeck();
      const post = this.props.loggedInAs  ? (


      <div className="profile">

      {/* INTRO TEXT  */}
      <fieldset>
        <legend><span class="number"></span> Hey {this.props.data.name} 👋 </legend>
        <label className="intro" type="text">Lets help you find your bae! Adjust your search settings here:</label>
      </fieldset>

      <br></br>



      <div className="settings">

          <form onSubmit={this.handleSubmit}>


        {/* LIFTSTYLE CHOICES */}
        <fieldset>
          <legend><span class="number"></span> I want to see:</legend>
          <label type="text">(<i>The following choices will determine the result of your searches</i>)</label>
          <br></br>

          {/*  3 STATE TOGGLE */}
          <p>Vegans </p>
          <div class="wrapper">
            <label for="yes_radio" id="yes-lbl">👍🏻</label><input type="radio" value="" name="choice_radio"    id="yes_radio"></input>
            <label for="maybe_radio" id="maybe-lbl">🤔</label><input type="radio" value="" name="choice_radio" id="maybe_radio" checked="checked"></input>
            <label for="no_radio" id="no-lbl">👎🏻</label><input type="radio" value="" name="choice_radio" id="no_radio"></input>
            <div class="toggle"></div>
          </div>

          <p>Non-Smoker? </p>
          <div class="wrapper">
            <label for="yes_radio" id="yes-lbl">👍🏻</label><input type="radio" value="" name="choice_radio"    id="yes_radio"></input>
            <label for="maybe_radio" id="maybe-lbl">🤔</label><input type="radio" value="" name="choice_radio" id="maybe_radio" checked="checked"></input>
            <label for="no_radio" id="no-lbl">👎🏻</label><input type="radio" value="" name="choice_radio" id="no_radio"></input>
            <div class="toggle"></div>
          </div>

          <p>Gym-goer? </p>
          <div class="wrapper">
            <label for="yes_radio" id="yes-lbl">👍🏻</label><input type="radio" value="" name="choice_radio"    id="yes_radio"></input>
            <label for="maybe_radio" id="maybe-lbl">🤔</label><input type="radio" value="" name="choice_radio" id="maybe_radio" checked="checked"></input>
            <label for="no_radio" id="no-lbl">👎🏻</label><input type="radio" value="" name="choice_radio" id="no_radio"></input>
            <div class="toggle"></div>
          </div>

          <p>Has kids? </p>
          <div class="wrapper">
            <label for="yes_radio" id="yes-lbl">👍🏻</label><input type="radio" value="" name="choice_radio"    id="yes_radio"></input>
            <label for="maybe_radio" id="maybe-lbl">🤔</label><input type="radio" value="" name="choice_radio" id="maybe_radio" checked="checked"></input>
            <label for="no_radio" id="no-lbl">👎🏻</label><input type="radio" value="" name="choice_radio" id="no_radio"></input>
            <div class="toggle"></div>
          </div>

          {/* Emoji 2-state toggles NB: DO NOT DELETE AS MAY USE IN 'EDIT PAGE'*/}
            {/* <div class="emoji-toggle emoji-diet">
              <input type="checkbox" id="toggle1" class="toggle"></input>
              <div class="emoji"></div>
              <label for="toggle1" class="well"></label>
            </div>

            <div class="emoji-toggle emoji-lifestyle">
              <input type="checkbox" id="toggle2" class="toggle"></input>
              <div class="emoji"></div>
              <label for="toggle2" class="well"></label>
            </div>

            <div class="emoji-toggle emoji-passtime">
              <input type="checkbox" id="toggle3" class="toggle"></input>
              <div class="emoji"></div>
              <label for="toggle3" class="well"></label>
            </div>

            <div class="emoji-toggle emoji-rate">
              <input type="checkbox" id="toggle5" class="toggle"></input>
              <div class="emoji"></div>
              <label for="toggle5" class="well"></label>
            </div>*/}

        </fieldset>


        {/* AGE RANGE SELECTOR */}
        <fieldset>
          <legend><span class="number"></span> Age & Location </legend>
          <div>
            <p>What age range do you want to checkout? Between...</p>
              <select onChange={this.handleChange} name="min_age">
                <option disabled hidden value=''></option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
                <option value="47">47</option>
                <option value="48">48</option>
                <option value="49">49</option>
                <option value="50">50</option>
              </select><p>and</p>
              <select onChange={this.handleChange} name="max_age">
                <option disabled hidden value=''></option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
                <option value="47">47</option>
                <option value="48">48</option>
                <option value="49">49</option>
                <option value="50">50</option>
                <option value="51">51</option>
                <option value="52">52</option>
                <option value="53">53</option>
                <option value="54">54</option>
                <option value="55">55</option>
                <option value="56">56</option>
                <option value="57">57</option>
                <option value="58">58</option>
                <option value="59">59</option>
                <option value="60">60</option>
                <option value="61">61</option>
                <option value="62">62</option>
                <option value="63">63</option>
                <option value="64">64</option>
                <option value="65">65</option>
                <option value="66">66</option>
                <option value="67">67</option>
                <option value="68">68</option>
                <option value="70">70</option>
                <option value="71">71</option>
                <option selected value="72">72</option>
              </select>
            </div>
          </fieldset>


        {/* DISTANCE RANGE SLIDER  */}
          <fieldset>
              <p>Max Distance (1-100 kilometres):</p>
              <span> <input type="range"  onChange={this.handleChange} max="99" min="0" step="1" name="distance"></input> </span>
              <p>Your current choice: {this.state.distance}km</p>
              <br></br><br></br>
              <input type="submit"  name="fieldb" class="Save"></input>
            </fieldset>
          </form>
        </div>
      </div>


) : (
    <div className="center"> Oops! You need to log in </div>
  )

  if (this.state.entered_search_query ===  false)
    {
      return(
      <div className="container">
      {post}
      </div>
      )
    }

    else if (this.state.query_results === {})
    {
      return(
      <div className="container"></div>
      )
    }

    else
    {
      return(
      <div className="container">



      <h5>The hottest Reach prospects served up just for you, {this.props.loggedInAs}</h5>
      <br></br>

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
    <legend><span class="number"></span> {user.name} ({user.location}), {getAge(user.date_of_birth)}yrs </legend>
    <label className="total-reach" type="text">Reach: {this.total_reach()}</label>
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
    <label type="text">{user.bio}</label>
  </div>

  <div>
    <legend><span class="number"></span>Further Info:</legend>
    <label type="text">Interests: 🥃 🇬🇧 ⚽️ 🥑 😬 </label>
    <label type="text">Distance: [ x ] miles (from you)</label>
    <label type="text">Liked by: {user.likes} people</label>
  </div>


</div>

{/* End */}




                    <div class="demo__card__img"><img src="{user.picture}"></img></div>
                    <p class="demo__card__name">{user.name}</p>
                  </div>
                  <div class="demo__card__btm">
                    <p class="demo__card__we">{user.bio}</p>
                  </div>
                   <div class="demo__card__choice m--reject"></div>
                   <div class="demo__card__choice m--like"></div>
                   <div class="demo__card__drag"></div>
                 </div>)}
{/*
                 <div class="demo__card">
                  <div class="demo__card__top lime">
                    <div class="demo__card__img"></div>
                    <p class="demo__card__name">Hungry cat 5</p>
                </div>
                <div class="demo__card__btm">
                  <p class="demo__card__we">Whatever</p>
                </div>
                  <div class="demo__card__choice m--reject"></div>
                  <div class="demo__card__choice m--like"></div>
                  <div class="demo__card__drag"></div>
                </div>
                <div class="demo__card">
                  <div class="demo__card__top cyan">
                  <div class="demo__card__img"></div>
                  <p class="demo__card__name">Hungry cat 4</p>
                </div>
                  <div class="demo__card__btm">
                    <p class="demo__card__we">Whatever</p>
                  </div>
                  <div class="demo__card__choice m--reject"></div>
                  <div class="demo__card__choice m--like"></div>
                  <div class="demo__card__drag"></div>
                </div>
                <div class="demo__card">
                  <div class="demo__card__top indigo">
                  <div class="demo__card__img"></div>
                  <p class="demo__card__name">Hungry cat 3</p>
                </div>
                  <div class="demo__card__btm">
                  <p class="demo__card__we">Whatever</p>
                </div>
                  <div class="demo__card__choice m--reject"></div>
                  <div class="demo__card__choice m--like"></div>
                  <div class="demo__card__drag"></div>
                </div>
                <div class="demo__card">
                  <div class="demo__card__top blue">
                  <div class="demo__card__img"></div>
                  <p class="demo__card__name">Hungry cat 2</p>
                </div>
                  <div class="demo__card__btm">
                    <p class="demo__card__we">Whatever</p>
                </div>
                  <div class="demo__card__choice m--reject"></div>
                  <div class="demo__card__choice m--like"></div>
                  <div class="demo__card__drag"></div>
                </div>
                <div class="demo__card">
                  <div class="demo__card__top purple">
                  <div class="demo__card__img"></div>
                  <p class="demo__card__name">Hungry cat</p>
                </div>
                  <div class="demo__card__btm">
                  <p class="demo__card__we">Whatever</p>
                </div>
                  <div class="demo__card__choice m--reject"></div>
                  <div class="demo__card__choice m--like"></div>
                  <div class="demo__card__drag"></div>
                </div> */}
              </div>
              <p class="demo__tip">Swipe left or right</p>
            </div>
            </div>



      {/* SWIPEDECK NO.3 END */}
</div>



// BELOW DISPLAYS RESULTS (WHEN USER HITS 'SUBMIT"')
  // <div>
  // <p>User {user.user} - their name is {user.name}</p>
  // <p>{user.bio}</p>
  // <h4>{this.approxDistanceBetweenTwoPoints(this.props.data.latitude, this.props.data.longitude, user.latitude, user.longitude).toFixed(2)}km away from you!</h4>
  // <br></br>
  // <p>{user.instagram_followers} is their Instagram Reach!</p>
  // <p>They self-rated as {user.gender_identity} on the gender continuum!</p>
  // <br></br>
  // <img src={`http://localhost:8080/social_reach/media/${user.picture}`}/>
  // <br></br>
  // <p>Go check out this user, {this.props.loggedInAs}!</p>
  // <br></br>
  // </div>



      )
    }



                  }
                  }


export default Settings;
