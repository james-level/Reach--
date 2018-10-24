import React, { Component } from "react";
import axios from 'axios';


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
      query_results: null
    };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
     this.setState({
       [evt.target.name]: parseInt(evt.target.value)
     })
  }

  handleSubmit(evt){
    evt.preventDefault();
    var min_age = this.state.min_age;
    var max_age = this.state.max_age;
    var filtering_url = `http://localhost:8080/social_reach/profiles/${this.props.loggedInAs}/minage=${min_age}/maxage=${max_age}/?format=json`;
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


  render(){

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
          <legend><span class="number"></span> I would like them to be: </legend>


          {/* ATTEMPTING 3 STATE TOGGLE */}
          <div class="wrapper">
            <label for="yes_radio" id="yes-lbl">👍🏻</label><input type="radio" value="" name="choice_radio"    id="yes_radio"></input>
            <label for="maybe_radio" id="maybe-lbl">🤔</label><input type="radio" value="" name="choice_radio" id="maybe_radio" checked="checked"></input>
            <label for="no_radio" id="no-lbl">👎🏻</label><input type="radio" value="" name="choice_radio" id="no_radio"></input>
          <div class="toggle"></div>
        </div>

          {/* END OF ATTEMPTED 3 STATE TOGGLE */}

            <div class="emoji-toggle emoji-diet">
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
            </div>
        </fieldset>


        {/* AGE RANGE SELECTOR */}
        <fieldset>
          <legend><span class="number"></span> Age & Location </legend>
          <div>
            <p>What age range do you want to checkout? Between...</p>
              <select onChange={this.handleChange} name="min_age">
                <option disabled hidden value=''></option>
                <option value="14">14</option>
                <option value="15">15</option>
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
              <p>What kind of distance suits you?</p>
                <select onChange={this.handleChange} name="miles">
                  <option disabled hidden value=''></option>
                  <option value=">5">5 miles</option>
                  <option value=">10">10 miles</option>
                  <option value="15">15 miles</option>
                  <option value="20">20 miles</option>
                  <option value="25">25 miles</option>
                  <option value="30">30 miles</option>
                  <option value="35">35 miles</option>
                  <option value="40">40 miles</option>
                  <option value="45">45 miles</option>
                  <option value="50">50 miles</option>
                  <option value="55">55 miles</option>
                  <option value="60">60 miles</option>
                  <option value="65">65 miles</option>
                  <option value="70">70 miles</option>
                  <option value="75">75 miles</option>
                  <option value="80">80 miles</option>
                  <option value="85">85 miles</option>
                  <option value="90">90 miles</option>
                  <option value="95">95 miles</option>
                </select>
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
      {this.state.query_results.map(user =>

// BELOW DISPLAYS RESULTS (WHEN USER HITS 'SUBMIT"')
  <div>
  <p>User {user.user} - their name is {user.name}</p>
  <p>{user.bio}</p>
  <p>{user.instagram_followers} is their Instagram Reach!</p>
  <p>They self-rated as {user.gender_identity} on the gender continuum!</p>
  <br></br>
  <img src={`http://localhost:8080/social_reach/media/${user.picture}`}/>
  <br></br>
  <p>Go check out this user, {this.props.loggedInAs}!</p>
  <br></br>
  </div>
)}
      </div>

      )
    }



                  }
                  }


export default Settings;
