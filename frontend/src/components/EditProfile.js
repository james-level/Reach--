import React, { Component } from "react";
import axios from 'axios';
import PasswordMask from 'react-password-mask';
import { Redirect } from 'react-router-dom'

class EditProfile extends Component {
  constructor(props) {
    super(props);

      this.state = {

        reachUpdated: false,
        submitButtonMessage: "Update my profile",
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
          id: this.props.data.user,
          name: this.props.data.name,
          looking_for: this.props.data.looking_for,
          location: this.props.data.location,
          date_of_birth: this.props.data.date_of_birth,
          gender: this.props.data.gender_identity,
          description: this.props.data.bio,
          interests: '',
          twitter_handle: this.props.data.twitter_handle,
          facebook_handle: '',
          instagram_handle: this.props.data.instagram_handle,
          youtube_handle: this.props.data.youtube_handle,
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
          userUpdated: null,
          veganChecked: this.props.data.vegan,
          nonSmokingChecked: this.props.data.non_smoker,
          prefersChillToGymChecked: this.props.data.prefers_chill_to_gym,
          childlessChecked: this.props.data.childless


        }

      this.updateReach = this.updateReach.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.fileChangedHandler = this.fileChangedHandler.bind(this);
      this.showLoadingIndicator = this.showLoadingIndicator.bind(this);

      this.handlePrefersChillToGymClicked = this.handlePrefersChillToGymClicked.bind(this);
      this.handleChildlessCheckClick = this.handleChildlessCheckClick.bind(this);
      this.handleVeganCheckClick = this.handleVeganCheckClick.bind(this);
      this.handleNonSmokingCheckClick = this.handleNonSmokingCheckClick.bind(this);

  }

  handleSubmit(evt){

      this.showLoadingIndicator()

    var self = this;
    evt.preventDefault();

    var user = self.state.id
    var name = self.state.name
    var bio = self.state.description
    var looking_for = self.state.looking_for
    var location = self.state.location
    var date_of_birth = self.state.date_of_birth
    var gender = self.state.gender
    var twitter_handle = self.state.twitter_handle
    var instagram_handle = self.state.instagram_handle
    var youtube_handle = self.state.youtube_handle
    var twitter_followers = this.props.data.twitter_followers;
    var instagram_followers = this.props.data.instagram_followers;
    var youtube_followers = this.props.data.youtube_followers;
    var picture_one = self.state.photo1
    var picture_two = self.state.photo2
    var picture_three = self.state.photo3
    var picture_four = self.state.photo4
    var picture_five = self.state.photo5
    var picture_six = self.state.photo6
    var password = self.state.password

    var vegan = self.state.veganChecked
    var non_smoker = self.state.nonSmokingChecked
    var prefers_chill_to_gym = self.state.prefersChillToGymChecked
    var childless = self.state.childlessChecked

    var token_passed_from_main = this.props.token_to_pass_on;
    console.log(picture_one);
    var edit_profile_url = `http://localhost:8080/social_reach/profiles/${this.props.loggedInAs}/`

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
    formData.append('twitter_followers', twitter_followers);
    formData.append('instagram_followers', instagram_followers);
    formData.append('youtube_followers', youtube_followers);
    formData.append('non_smoker', non_smoker);
    formData.append('vegan', vegan);
    formData.append('prefers_chill_to_gym', prefers_chill_to_gym);
    formData.append('childless', childless);

    var token_refresh_url = 'http://localhost:8080/social_reach/auth-jwt-refresh/`';


    axios.post(token_refresh_url, {'token': `${token_passed_from_main}`}).then(function(response){
      var refreshed_token = response.data['token']

      axios.put(edit_profile_url, formData,
    { headers: { 'Authorization': `JWT ${refreshed_token}` , 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' } }).then(()=>{
        self.setState({
          userUpdated: true
        })
        console.log("Done");
        self.props.handleLoginFromRegistrationSubmit( self.props.loggedInAs, password)
        })
      .catch(function(e){
        console.log(e);
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

componentWillMount() {

    this.setState({ userUpdated: null });
  }

  showLoadingIndicator(){
    this.setState({ submitButtonMessage: "Loading..." })
    console.log("LOADING INDICATOR STATE:", this.state.submitButtonMessage);
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




  updateReach(){


    var username = this.props.loggedInAs;

    var user = this.props.data.user;
    var name = this.props.data.name;
    var bio = this.props.data.bio;
    var looking_for = this.props.data.looking_for;
    console.log("LOOKING FOR", looking_for);
    console.log("USER", user);
    var location = this.props.data.location;
    var date_of_birth = this.props.data.date_of_birth;
    var gender = this.props.data.gender_identity;
    var twitter_handle = this.props.data.twitter_handle;
    var instagram_handle = this.props.data.instagram_handle;
    var youtube_handle = this.props.data.youtube_handle;
    var twitter_followers = this.props.data.twitter_followers;
    var instagram_followers = this.props.data.instagram_followers;
    var youtube_followers = this.props.data.youtube_followers;
    var picture_one = this.props.data.picture;
    var picture_two = this.props.data.picture_two;
    var picture_three = this.props.data.picture_three;
    var picture_four = this.props.data.picture_four;
    var picture_five = this.props.data.picture_five;
    var picture_six = this.props.data.picture_six;

    var token_passed_from_main = this.props.token_to_pass_on;

    var self = this;

    var update_reach_url = `http://localhost:8080/social_reach/profiles`

    const formData = new FormData();
    // formData.append('picture', picture_one);
    // formData.append('picture_two', picture_two);
    // formData.append('picture_three', picture_three);
    // formData.append('picture_four', picture_four);
    // formData.append('picture_five', picture_five);
    // formData.append('picture_six', picture_six);
    formData.append('name', name);
    // formData.append('user', user);
    formData.append('bio', bio);
    // formData.append('looking_for', looking_for);
    formData.append('location', location);
    formData.append('date_of_birth', date_of_birth);
    formData.append('gender_identity', gender);
    formData.append('twitter_handle', twitter_handle);
    formData.append('instagram_handle', instagram_handle);
    formData.append('youtube_handle', youtube_handle);
    formData.append('twitter_followers', twitter_followers);
    formData.append('instagram_followers', instagram_followers);
    formData.append('youtube_followers', youtube_followers);

    console.log(formData);
    axios.patch(`http://localhost:8080/social_reach/profiles/${username}/`,
      formData
   ,
 { headers: { 'Authorization': `JWT ${token_passed_from_main}` , 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' } }).then(function (response) {
    self.setState({
      reachUpdated: true
    })
    console.log("REACH UPDATED");
}).catch(function(error){
console.log(error);
console.log("Error updating Reach.");
})
}

  render(){

    console.log("RENDERING and it is:", this.state.loadingInProgress);

    var userUpdated = this.state.userUpdated

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

  if (!this.props.loggedInAs){
    return (
      <div className="center"> Oops! You need to log in </div>
    )
  }

  if (userUpdated){
      return <Redirect to='/profile' data={this.state} loggedInAs={this.state.username} login= {true}/>
    }

    // else if (this.state.loadingInProgress === true) {
    //   return (
    //
    //     <div class="loader">
    //
    //       <div>HELLO THIS DOESNT WORK</div>
    //       <div></div>
    //       <div></div>
    //       <div></div>
    //       <div></div>
    //     </div>
    //   )
    // }

   else{
     console.log("loadingInProgress is false");
    return(

      <div>


      <div className="register">

      <h6 align="center" style={{fontWeight: 'bold'}}>Hey {this.props.data.name}! {"Update your profile here"}</h6>
<p></p>

    {/* PROFILE INFO INPUT FORM START */}
    <div class="user-input-form">
      <form onSubmit={this.handleSubmit}>

    {/* BASIC INFO SECTION */}
    <fieldset>
    <PasswordMask id="password" name="password" placeholder="Enter password - just so we know it's really you" value={this.state.password}
onChange={this.handleChange} useVendorStyles={true} buttonStyles={buttonStyles} inputStyles={inputStyles}
/>
          <legend><span class="number"></span> Basic Info</legend>

          <p>Your name:</p>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name}></input>
          <p>Looking for:</p>
          <select onChange={this.handleChange} name="looking_for" value={this.state.looking_for}>
            <option value="Any">Any</option>
            <option value="Girls">Girls</option>
            <option value="Guys">Guys</option>
          </select>


          {/* LOCATION INPUT */}
          <p>Location:</p>
          <input type="text" onChange={this.handleChange} name="location" value={this.state.location}></input>

          {/* DOB INPUT */}
          <p>Date of Birth:</p>
          <input type="date" onChange={this.handleChange} name="date_of_birth" value={this.state.date_of_birth}></input>

          {/* GENDER INPUT */}
          <p> Gender Identity? </p>
          <span> Female  <input type="range"  onChange={this.handleChange} max="99" min="-100" step="1" name="gender" value={this.state.gender}></input>  Male </span>
          <br></br><br></br>

          {/* BIO/DESCRIPTION INPUT  */}
          <p>About You:</p>
          <textarea name="description" onChange={this.handleChange} value={this.state.description} maxlength="500"></textarea>

          {/*LIFESTYLE EMOJI TOGGLES  */}
          <legend><span class="number"></span> Lifestyle</legend>
          <p> (select which apply to you) </p>

          <div class="emoji-toggle emoji-diet">
            <input type="checkbox" checked={this.state.veganChecked} onChange={this.handleVeganCheckClick} id="toggle1" class="toggle"></input>
            <div class="emoji"></div>
            <label for="toggle1" class="well"></label>
          </div>

          <div class="emoji-toggle emoji-lifestyle">
            <input type="checkbox" checked={this.state.nonSmokingChecked} onChange={this.handleNonSmokingCheckClick} id="toggle2" class="toggle"></input>
            <div class="emoji"></div>
            <label for="toggle2" class="well"></label>
          </div>

          <div class="emoji-toggle emoji-passtime">
            <input type="checkbox" checked={this.state.prefersChillToGymChecked} onChange={this.handlePrefersChillToGymClicked} id="toggle3" class="toggle"></input>
            <div class="emoji"></div>
            <label for="toggle3" class="well"></label>
          </div>

          <div class="emoji-toggle emoji-rate">
            <input type="checkbox" checked={this.state.childlessChecked} onChange={this.handleChildlessCheckClick} id="toggle5" class="toggle"></input>
            <div class="emoji"></div>
            <label for="toggle5" class="well"></label>
          </div>

          {/*INTERESTS INPUT (EMOJI's)  */}
          <label for="job">Interests:</label>
            <input type="text" onChange={this.handleChange} data-emojiable="true"  maxlength="5" name="interests" placeholder="Pick five emojis that represent your interests"></input>

    </fieldset>
<br></br>

    {/* SOCIAL MEDIA SECTION */}
          <fieldset>
            <legend><span class="number"></span>Social Reach</legend>
            <p>Twitter Handle:</p>
            <input type="text" onChange={this.handleChange} name="twitter_handle" value={this.state.twitter_handle}></input>
            <p>Instagram Handle:</p>
            <input type="text" onChange={this.handleChange} name="instagram_handle" value={this.state.instagram_handle} ></input>
            <p>YouTube Handle:</p>
            <input type="text" onChange={this.handleChange} name="youtube_handle" value={this.state.youtube_handle}></input>
            <p>Facebook Handle:</p>
            <input type="text" onChange={this.handleChange} name="facebook_handle" placeholder="Facebook     (coming soon) "></input>
            <p>SnapChat Handle:</p>
            <input type="text" onChange={this.handleChange} name="snapchat" placeholder="SnapChat     (coming soon) "></input>
            <p>Spotify Handle:</p>
            <input type="text" onChange={this.handleChange} name="spotify_handle" placeholder="Spotify    (coming soon)"></input>
          </fieldset>


    {/* OTHER INFO ECTION */}
      <fieldset>
        <legend><span class="number"></span>Additional Info</legend>
        <textarea name="additional_info" onChange={this.handleChange} placeholder="Anything else you want to tell the world?" maxlength="120"></textarea>
      </fieldset>

    {/* PHOTO UPLOAD SECTION */}
      <legend><span class="number"></span>Photos</legend>
            <div class="flex_upload">
    {photoUpload}
    {emptySlotPlaceholder}
  </div>

    {/*  SAVE BUTTON */}
      <br></br>
        <input type="submit" name="field12" value={this.state.submitButtonMessage} class="Save"></input>

      </form>
    </div>


    {/* PROFILE INFO INPUT FORM END */}

      </div>

      </div>

    )
  }

}
  }




export default EditProfile;
