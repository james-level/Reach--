import React, { Component } from "react";
import axios from 'axios';


class SearchUsers extends Component {
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
    console.log(this.state.min_age);
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

      <div>
      <form onSubmit={this.handleSubmit}>
        <p>Search for our hottest users, {this.props.loggedInAs}! Remember, you can change your gender preferences on your profile page at any time!</p>
        <p></p>
        <p>Users aged between</p>
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
      </select>
      <p></p>
        <p>and</p>
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
        <option value="72">72</option>
      </select>


      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <input type="submit"  name="field12" class="Save"></input>

      </form>

      </div>

    )
    : (
      <div className="center"> Oops! You need to log in :/ </div>
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
      <div className="container">
      <p>REACHING OUT REACHING OUT REACHING OUT</p>

      </div>

      )
    }

    else
    {
      return(
      <div className="container">
      <h5>The hottest Reach prospects served up just for you, {this.props.loggedInAs}</h5>
      <br></br>
      {this.state.query_results.map(user =>
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


export default SearchUsers;
