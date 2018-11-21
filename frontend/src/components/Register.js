import React, { Component } from "react";
import axios from 'axios';
import PasswordMask from 'react-password-mask';
import { Redirect } from 'react-router-dom';
import Indicator from './Indicator';
import LifestyleEmojiToggles from './LifestyleEmojiToggles';
import $ from 'jquery';

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image_count: [1],
        upload_status: {
          photo1: 'foto-upload',
          photo2: 'foto-upload',
          photo3: 'foto-upload',
          photo4: 'foto-upload',
          photo5: 'foto-upload',
          photo6: 'foto-upload'
        },
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
          looking_for: 'Any',
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
          image1:'empty',
          image2:'empty',
          image3:'empty',
          image4:'empty',
          image5:'empty',
          image6:'empty',
          image1_message: 'Choose photo',
          image2_message: '5 left',
          image3_message: '4 left',
          image4_message: '3 left',
          image5_message: '2 left',
          image6_message: '1 left, make it count!',
          photo1: '',
          photo2: '',
          photo3: '',
          photo4: '',
          photo5: '',
          photo6: '',
          veganChecked: false,
          nonSmokingChecked: false,
          prefersChillToGymChecked: false,
          childlessChecked: false,
          profileSubmitted: false


        }
        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        // this.removeImageSelection = this.removeImageSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handlePrefersChillToGymClicked = this.handlePrefersChillToGymClicked.bind(this);
        this.handleChildlessCheckClick = this.handleChildlessCheckClick.bind(this);
        this.handleVeganCheckClick = this.handleVeganCheckClick.bind(this);
        this.handleNonSmokingCheckClick = this.handleNonSmokingCheckClick.bind(this);
      };


    handleSubmit(evt){
      console.log(this.state);

      var self = this;
      evt.preventDefault();
      console.log("pw", this.state.activation_user_password);
      console.log("username",self.state.activation_user['username']);

      console.log(self.state.password);
// poST request currently meaningless as no JWT is needed to make profile currently
    var session_url = 'http://localhost:8080/social_reach/jwt_login/';

    self.setState({

      profileSubmitted: true

    })


    axios.post(session_url, {
        'username': self.state.activation_user['username'],
        'password':  self.state.password
      }).then(function(response) {
      console.log('response:', response);
      console.log('Obtained token. (PROFILE)');
      var token = response.data['token']
      axios.post(`http://localhost:8080/social_reach/auth-jwt-verify/`,  {
          "token": token,
          'username': self.state.activation_user['username'],
          'password': self.state.password
        }).then(function(second_response) {
          console.log(response);
        console.log('Authenticated');
        var token = response.data['access']
      var user = self.state.activation_user['id']
      var name = self.state.name
      var bio = self.state.description
      var looking_for = self.state.looking_for
      console.log(looking_for);
      var location = self.state.location
      var date_of_birth = self.state.date_of_birth
      var gender = self.state.gender
      var twitter_handle = self.state.twitter_handle
      var instagram_handle = self.state.instagram_handle
      var youtube_handle = self.state.youtube_handle
      var picture_one = self.state.photo1
      var picture_two = self.state.photo2
      var picture_three = self.state.photo3
      var picture_four = self.state.photo4
      var picture_five = self.state.photo5
      var picture_six = self.state.photo6
      var vegan = self.state.veganChecked
      var non_smoker = self.state.nonSmokingChecked
      var prefers_chill_to_gym = self.state.prefersChillToGym
      var childless = self.state.childlessChecked
      console.log(picture_one);
      var create_profile_url = 'http://localhost:8080/social_reach/profiles/'

      const formData = new FormData();
      formData.append('picture', picture_one);
      formData.append('picture_two', picture_two);
      formData.append('picture_three', picture_three);
      formData.append('picture_four', picture_four);
      formData.append('picture_five', picture_five);
      formData.append('picture_six', picture_six);
      formData.append('name', name);
      formData.append('user', user);
      formData.append('bio', bio);
      formData.append('looking_for', looking_for);
      formData.append('location', location);
      formData.append('date_of_birth', date_of_birth);
      formData.append('gender_identity', gender);
      formData.append('twitter_handle', twitter_handle);
      formData.append('instagram_handle', instagram_handle);
      formData.append('youtube_handle', youtube_handle);
      formData.append('non_smoker', non_smoker);
      formData.append('vegan', vegan);
      formData.append('prefers_chill_to_gym', prefers_chill_to_gym);
      formData.append('childless', childless);
      axios.post(create_profile_url, formData).then(()=>{
        console.log("Done");
          self.props.handleLoginFromRegistrationSubmit( self.state.activation_user['username'], self.state.password)
        })
      })}).catch(function(e){
        console.log(e);
      })
    }

    handleChange(evt){
       this.setState({
         [evt.target.name]: evt.target.value
       })
    }

    // delete method - probably will need to restructure image state elements into array of objects
    // removeImageSelection(evt){
    //   console.log("INDEX:",evt.target.attributes.index.nodeValue);
    //   let index = evt.target.attributes.index.nodeValue;
    //   this.setState(prevState => ({
    //     [`image${index}`]: prevState[`image${index+1}`],
    //     [`photo${index}`]: prevState[`photo${index+1}`]
    //   }))
    // }



    fileChangedHandler(event){
      console.log(event.target.id);
      console.log(event.target.files);
      let photo = event.target.name
      let image = event.target.id
      let message = image + '_message'
      console.log();

      let count = event.target.attributes.index.nodeValue
      let preview_image = "image" + count
      let reader = new FileReader()
      reader.onloadend = () => {
        /* do not draw new upload button if 6 photos have been uploaded or image is being replaced */
        if (this.state.image_count.length < 6 && this.state[preview_image] === 'empty'){
        this.setState(prevState => ({ image_count: [...prevState.image_count, prevState.image_count.length+1]}))
      }
        this.setState({
          [image]: reader.result
          })

         }
    if (event.target.files[0] != undefined ){
      reader.readAsDataURL(event.target.files[0])
      }
    this.setState(prevState => ({
    upload_status: {
        ...prevState.upload_status,
        [photo]: 'foto-upload-ready'
    }
    }))
    this.setState({
      [event.target.name]: event.target.files[0],
      [message]: "Tap to change"

        })

}


    handleVeganCheckClick() {
        this.setState({ veganChecked: !this.state.veganChecked });
      }

    handleNonSmokingCheckClick() {
        this.setState({ nonSmokingChecked: !this.state.nonSmokingChecked });
      }

    handleChildlessCheckClick() {
        this.setState({ childlessChecked: !this.state.childlessChecked });
      }

    handlePrefersChillToGymClicked() {
        this.setState({ prefersChillToGymChecked: !this.state.prefersChillToGymChecked });
      }



    componentDidMount(){
          console.log(this.props.data.history);

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
         }



    render(){

      var photoUpload =  this.state.image_count.map(index => {
        let name = "photo" + index
        let id = "image" + index
        let message = id + '_message'
        let backgroundImage = {
          backgroundImage: `url(${this.state[id]})`,
          backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'noRepeat'
        }
        return (
          <fieldset class="photo_upload_container">

            <label for={id}  style={backgroundImage} altText="uploaded image" class={this.state.upload_status[`${name}`]}></label>
             <div class="overlay" index={index} >{this.state[message]}</div>
            <input type="file" index={index} onChange={this.fileChangedHandler} name={name} id={id} class={this.state.upload_status[`${name}`]} ></input>

          </fieldset>

        )
      })

      var test = new Array(0);


      var remaining_slots = new Array(6 -  this.state.image_count.length).join().split(',')
    .map(function(item, index){ return ++index;})
      console.log("hello slots",remaining_slots);
      var emptySlotPlaceholder = null;

      if (this.state.image_count.length === 6){
         emptySlotPlaceholder = '';
      }else{
      emptySlotPlaceholder = remaining_slots.map(index => {
        return (
              <fieldset class="photo_upload_container">

          <div class="empty_slot_placeholder">
          </div>
            </fieldset>

        )
      })
    }



      var inputStyles = {
        width: '100%',
        marginBottom: 'none'
        // fontSize: '0.8em'
      };

      var buttonStyles = {
       top: '50%',
       right: '0.1em',
       marginTop: '-13px',
       padding: '4px ',
       background: 'rgb(43, 187, 173)',
       borderRadius: '2px',
       color: 'rgb(255, 255, 255)',
       textAlign: 'center',
       textDecoration: 'none',
       textTransform: 'uppercase',
       userSelect: 'none',
       display: 'inline',
       fontSize: '0.7em'
      }


       if (this.props.info.user){
        return <Redirect to='/profile' password= {this.state.password} data={this.state} loggedInAs={this.state.username} login= {true}/>
      }

      if (this.state.activation_user && this.state.profileSubmitted === false){
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

            {/* NAME & PASSWORD FIELDS  */}
            <input onChange={this.handleChange} type="text" name="name" placeholder="Your Name *"></input>
            <PasswordMask id="password" name="password" placeholder="Enter password" value={this.state.password}
 onChange={this.handleChange} useVendorStyles={true} buttonStyles={buttonStyles} inputStyles={inputStyles}
/>

            {/* HOMETOWN INPUT */}
            <input type="text" onChange={this.handleChange} name="location" placeholder="Your hometown *"></input>

            {/* DOB INPUT */}
            <input type="date" onChange={this.handleChange} name="date_of_birth" placeholder="Date Of Birth *"></input>

            {/* GENDER INPUT */}
            <p> Gender Identity: </p>
            <span> female <input type="range"  onChange={this.handleChange} max="99" min="-100" step="1" name="gender" placeholder="Your Gender *"></input> male </span>
            <br></br><br></br>

            {/* BIO/DESCRIPTION INPUT  */}
            <p>About You:</p>
            <textarea name="description" onChange={this.handleChange} placeholder="Description (max 500 characters) *" maxlength="500"></textarea>

            {/*LIFESTYLE EMOJI TOGGLES  */}
            <legend><span class="number"></span> Lifestyle</legend>
            <p> (select which apply to you) </p>

            <LifestyleEmojiToggles

            veganChecked={this.state.veganChecked}
            smokingChecked={this.state.nonSmokingChecked}
            prefersChillToGym={this.state.prefersChillToGymChecked}
            childlessChecked={this.state.childlessChecked}
            handleVeganCheckClick={this.handleVeganCheckClick}
            handleNonSmokingCheckClick={this.handleNonSmokingCheckClick}
            handlePrefersChillToGymClicked={this.handlePrefersChillToGymClicked}
            handleChildlessCheckClick={this.handleChildlessCheckClick}

            />

            {/*INTERESTS INPUT (EMOJI's)  */}
              {/* <input type="text" onChange={this.handleChange} data-emojiable="true"  maxlength="5" name="interests" placeholder="Pick five emojis that represent your interests"></input> */}

            {/* 'LOOKING FOR' Field */}
            <p>Looking for:</p>
            <select onChange={this.handleChange} name="looking_for">
              <option value="Any">Any</option>
              <option value="Girls">Girls</option>
              <option value="Guys">Guys</option>
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
        {/* <fieldset>
          <legend><span class="number"></span>Additional Info</legend>
          <textarea name="additional_info" onChange={this.handleChange} placeholder="Anything else you want to tell the world?" maxlength="120"></textarea>
        </fieldset> */}

      {/* PHOTO UPLOAD SECTION */}
        <legend><span class="number"></span>Photos</legend>
              <div class="flex_upload">
      {photoUpload}
      {emptySlotPlaceholder}
    </div>

      {/*  SAVE BUTTON */}
        <br></br>
          <input type="submit"  name="field12" class="Save"></input>

        </form>
      </div>

        </div>
      )
    }

    else {
      return (

        <Indicator / >

      )
    }


    }

}

export default Register;
