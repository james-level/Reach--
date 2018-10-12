import React, { Component } from "react";
import axios from 'axios';




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
        activation_user: '',

          name: 'test',
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

      };




    handleChange(evt){


       this.setState({
         [evt.target.name]: evt.target.value
       })

    }

    componentDidMount(){

      // needs updated to include the correct activation components
      var username = this.props.data.match.params.id
      console.log(uid);
      var token = this.props.data.match.params.token
      console.log(token);
      var activation_url = `http://localhost:8080/social_reach/auth/users/confirmation/${username}`
      axios({
            method: 'post',
            'url': activation_url,
            'data': {
                uid: uid,
                token: token
            },
            'headers': {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
                console.log(error);
        });
  }

    render(){
      return (
        <div className="register">

      {/* PROFILE INFO INPUT FORM START */}
      <div class="user-input-form">
        <form onSubmit="hello">

      {/* BASIC INFO SECTION */}
          <fieldset>
            <legend><span class="number"></span> Basic Info</legend>
            <input onChange={this.handleChange} type="text" name="name" placeholder="Your Name *"></input>
            <input type="text" onChange={this.handleChange} name="location" placeholder="The Nearest Town/City To Where You Live *"></input>
            <input type="date" onChange={this.handleChange} name="date_of_birth" placeholder="Your Date Of Birth *"></input>
            <p> gender select </p>
            <input type="range"  onChange={this.handleChange} max="100" min="-100" step="1" name="gender" placeholder="Your Gender *"></input>
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


};

export default Register;
