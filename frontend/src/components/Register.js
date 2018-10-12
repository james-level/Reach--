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
        activation_user: ''
      };


    }

    componentDidMount(){

      // http://localhost:8080/social_reach/auth/users/activate/{username}/{token}
      var username = this.props.data.match.params.id
      var token = this.props.data.match.params.token
      var activation_url = `http://localhost:8080/social_reach/auth/users/confirmation/`
      axios.post(activation_url, {
        username: username
      }).then(()=>{
      console.log("something happened");
      }).catch(function(e){
        console.log(e);
      })
    }

    render(){
      return (
        <div className="register">

      {/* PROFILE INFO INPUT FORM START */}
      <div class="user-input-form">
        <form>

      {/* BASIC INFO SECTION */}
          <fieldset>
            <legend><span class="number"></span> Basic Info</legend>
            <input type="text" name="field1" placeholder="Your Name *"></input>
            <input type="text" name="field2" placeholder="The Nearest Town/City To Where You Live *"></input>
            <input type="date" name="field3" placeholder="Your Date Of Birth *"></input>
            <input type="text" name="field4" placeholder="Your Gender *"></input>
            <textarea name="field5" placeholder="Description (max 500 characters) *" maxlength="500"></textarea>

      {/*  TODO: Replace this 'Interests drop-down (below) with a 'show emoji's to represent you' field?   */}
            <label for="job">Interests:</label>
              <select id="job" name="field6">
                <optgroup label="I like to post/blog/vlog about...">
                  <option value="travel">Travel</option>
                  <option value="ecology">Saving The Planet</option>
                  <option value="gym">Gym</option>
                  <option value="animals">Animals</option>
                  <option value="politics">Politics</option>
                  <option value="food">Food Porn</option>
                  <option value="fashion">Fashion/Beauty</option>
                  <option value="sport">Sport</option>
                </optgroup>
              </select>
            </fieldset>


      {/* SOCIAL MEDIA SECTION */}
            <fieldset>
              <legend><span class="number"></span>Social Reach</legend>
              <input type="text" name="field7" placeholder="Twitter         (enter the bit after 'twitter.com/') "></input>
              <input type="text" name="field8" placeholder="Instagram   (enter the bit after 'instagram.com/') "></input>
              <input type="text" name="field9" placeholder="YouTube     (enter the bit after 'youtube.com/user/') "></input>
              <input type="text" name="field10" placeholder="Facebook     (enter the bit after 'facebook.com/') "></input>
              <input type="text" name="fiel11" placeholder="SnapChat     (enter the bit after 'snapchat.com') "></input>
              <input type="text" name="field9" placeholder="Spotify    (ARTISTS ONLY!)"></input>
            </fieldset>


      {/* OTHER INFO ECTION */}
        <fieldset>
          <legend><span class="number"></span>Additional Info</legend>
          <textarea name="field10" placeholder="Anything else you want to tell the world?" maxlength="120"></textarea>
        </fieldset>

      {/* PHOTO UPLOAD SECTION */}
        <fieldset>
          <legend><span class="number"></span>Photos</legend>
          <input type="file" name="field11" class="foto-upload"></input>
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
