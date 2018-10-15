import React, { Component } from "react";
import axios from 'axios';
import PasswordMask from 'react-password-mask';




class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        login: false,
        signUpSubmit: false,
        data: {},
        activation_token: '',
        activation_user: null,
        activation_user_password: '',

          password: '',
          name: 'test',
          looking_for: '',
          location: '',
          date_of_birth: '',
          gender: 0,
          description: '',
          interests: '',
          twitter_handle: '',
          facebook_handle: '',
          instagram_handle: '',
          youtube_handle: '',
          spotify_handle: '',
          snapchat: '',
          additional_info: '',
          photo1: '',
          photo2: '',
          photo3: '',
          photo4: '',
          photo5: '',
          photo6: ''


        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);


      };


    handleSubmit(evt){
      var self = this;
      evt.preventDefault();
      console.log(this.state.activation_user_password);
      console.log(self.state.activation_user['username']);
      var session_url = 'http://localhost:8080/social_reach/api/auth/token/obtain/';
      console.log(self.state.password);
// poST request currently meaningless as no JWT is needed to make profile currently
      axios.post(session_url, {
          'username': self.state.activation_user['username'],
          'password': self.state.password
        }).then(function(response) {
          console.log(response);
        console.log('Authenticated');
        var token = response.data['access']
        console.log(token);

      var user = self.state.activation_user['id']
      var name = self.state.name
      var looking_for = self.state.looking_for
      console.log(looking_for);
      var location = self.state.location
      var date_of_birth = self.state.date_of_birth
      var gender = self.state.gender
      var twitter_handle = self.state.twitter_handle
      var instagram_handle = self.state.instagram_handle
      var youtube_handle = self.state.youtube_handle
      var create_profile_url = 'http://localhost:8080/social_reach/profiles/'
      axios.post(create_profile_url, {
        'user': user,
        'name': name,
        'looking_for': looking_for,
        'location': location,
        'date_of_birth': date_of_birth,
        'gender_identity': gender,
        'twitter_handle': twitter_handle,
        'instagram_handle': instagram_handle,
        'youtube_handle': youtube_handle
      }).then(()=>{
        console.log("Done");
        })
      }).catch(function(e){
        console.log(e);
      })
    }


    handleChange(evt){


       this.setState({
         [evt.target.name]: evt.target.value
       })

    }



    componentDidMount(){

      // needs updated to include the correct activation components
      var self = this;
      var uid = this.props.data.match.params.id
      console.log(uid);
      var token = this.props.data.match.params.token
      console.log(token);
      var activation_url = `http://localhost:8080/social_reach/auth/users/confirmation/${uid}/${token}`
       axios.get(`${activation_url}/?format=json`).then(function (response) {
            self.setState({
              activation_user: response.data.user
            })
        }).catch(function (error) {
                console.log(error);
        });
        console.log(this.props);


        // var session_url = 'http://localhost:8080/social_reach/api/auth/token/obtain/';
        // axios.post(session_url, {
        //
        //   // PROVIDE CREDENTIALS TO BRING BACK NON-ENCRYPTED PASSWORD FOR CURRENT USER
        //     'username': 'jamesbond007',
        //     'password': 'p'
        //   }).then(function(response) {
        //     console.log(response);
        //   console.log('Authenticated');
        //   var token = response.data['access']
        //   console.log(token);
        //
        // var password_url = `http://localhost:8080/social_reach/users/${self.state.activation_user.id}`
        // axios.get(`${password_url}/?format=json`, { headers: { Authorization: `Bearer ${token}` } }).then(function (response) {
        //      console.log(response)
        //      self.setState({
        //        activation_user_password: response.data.user['password']
        //      })
        //      console.log(self.state.activation_user_password);
        //  }).catch(function (error) {
        //          console.log(error);
         }


    render(){

      if (this.state.activation_user){
      return (
        <div className="register">

        <h6 align="center" style={{fontWeight: 'bold'}}>Welcome to &copy;Reach, {this.state.activation_user['username']}! {"Let's start by making your profile."}</h6>
<p></p>

      {/* PROFILE INFO INPUT FORM START */}
      <div class="user-input-form">
        <form onSubmit={this.handleSubmit}>

      {/* BASIC INFO SECTION */}
          <fieldset>
            <legend><span class="number"></span> Basic Info</legend>
            <PasswordMask id="password" name="password" placeholder="Enter password" value={this.state.password}
 onChange={this.handleChange}
/>

            <input onChange={this.handleChange} type="text" name="name" placeholder="Your Name *"></input>
            <input onChange={this.handleChange} type="text" name="looking_for" placeholder="Seeking (Male / Female / Both)"></input>
            <input type="text" onChange={this.handleChange} name="location" placeholder="The Nearest Town/City To Where You Live *"></input>
            <input type="date" onChange={this.handleChange} name="date_of_birth" placeholder="Your Date Of Birth *"></input>
            <p> {"What's your gender identity?"} </p>
            Female  <input type="range"  onChange={this.handleChange} max="100" min="-100" step="1" name="gender" placeholder="Your Gender *"></input>  Male
            <textarea name="description" onChange={this.handleChange} placeholder="Description (max 500 characters) *" maxlength="500"></textarea>

      {/*  TODO: Replace this 'Interests drop-down (below) with a 'show emoji's to represent you' field?   */}
            <label for="job">Interests:</label>
              <select id="job" name="interests" onChange={this.handleChange}>
                <optgroup label="I like to post/blog/vlog about...">
                  <option value="travel">Travel</option>
                  <option value="ecology">Saving The Planet</option>
                  <option value="gym">Gym</option>
                  <option value="animals">Animals</option>
                  <option value="politics">Politics</option>
                  <option value="food">Food Porn</option>
                  <option value="fashion">Fashion/Beauty</option>
                  <option value="sport">Sport</option>
                  <option value="music">Music</option>
                  <option value="films">Films</option>
                  <option value="geeky stuff">Geeky stuff</option>
                </optgroup>
              </select>
            </fieldset>


      {/* SOCIAL MEDIA SECTION */}
            <fieldset>
              <legend><span class="number"></span>Social Reach</legend>
              <input type="text" onChange={this.handleChange} name="twitter_handle" placeholder="Twitter         (enter the bit after 'twitter.com/') "></input>
              <input type="text" onChange={this.handleChange} name="instagram_handle" placeholder="Instagram   (enter the bit after 'instagram.com/') "></input>
              <input type="text" onChange={this.handleChange} name="youtube_handle" placeholder="YouTube     (enter the bit after 'youtube.com/user/') "></input>
              <input type="text" onChange={this.handleChange} name="facebook_handle" placeholder="Facebook     (enter the bit after 'facebook.com/') "></input>
              <input type="text" onChange={this.handleChange} name="snapchat" placeholder="SnapChat     (enter the bit after 'snapchat.com') "></input>
              <input type="text" onChange={this.handleChange} name="spotify_handle" placeholder="Spotify    (ARTISTS ONLY!)"></input>
            </fieldset>


      {/* OTHER INFO ECTION */}
        <fieldset>
          <legend><span class="number"></span>Additional Info</legend>
          <textarea name="additional_info" onChange={this.handleChange} placeholder="Anything else you want to tell the world?" maxlength="120"></textarea>
        </fieldset>

      {/* PHOTO UPLOAD SECTION */}
        <fieldset>
          <legend><span class="number"></span>Photos</legend>
          <input type="file" onChange={this.handleChange} name="photo1" class="foto-upload"></input>
        </fieldset>

      {/*  SAVE BUTTON */}
        <br></br>
          <input type="submit" name="field12" class="Save"></input>

        </form>
      </div>


      {/* PROFILE INFO INPUT FORM END */}

        </div>
      )
    }

    else {
      return <div><p></p></div>
    }


    }

}

export default Register;
