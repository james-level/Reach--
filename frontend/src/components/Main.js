import React, { Component } from "react";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Register from "./Register";
import Profile from "./Profile";
import PublicProfile from "./PublicProfile";
import SearchUsers from "./SearchUsers";
import PasswordReset from "./PasswordReset";
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Redirect } from 'react-router-dom'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
      signUpSubmit: false,
      forgottenPassword: false,
      resetPasswordSubmitted: false,
      data: {},
      loggedInAs: '',
      activation_token: '',
      activation_user: '',
      reset_token: '',
      reset_uid: '',
      reroute: false,
      signup_load: '',
      message: ''

    };

    this.signUpPassword = null

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)
    this.handleForgottenPassword = this.handleForgottenPassword.bind(this)
    this.handlePasswordResetSubmit = this.handlePasswordResetSubmit.bind(this)
    this.get_uniqueID = this.get_uniqueID.bind(this)
    this.get_reset_token = this.get_reset_token.bind(this)
    this.handleLoginFromRegistrationSubmit = this.handleLoginFromRegistrationSubmit.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    console.log(this.props);
  }

get_uniqueID(uid){
  this.setState({
    reset_uid: uid
  })
}

set_signUpPassword(word){
  this.signUpPassword = word
}

get_reset_token(token){
  this.setState({
    reset_token: token
  })
}


  // login success
  login(){
    this.setState({
      login: true
    })
  }

  handleLogOut(){

    this.setState({
      username: '',
      password: '',
      login: false,
      signUpSubmit: false,
      forgottenPassword: false,
      resetPasswordSubmitted: false,
      data: {},
      loggedInAs: '',
      activation_token: '',
      activation_user: '',
      reset_token: '',
      reset_uid: '',
      reroute: false,
      signup_load: ''
    })
  }

  handleForgottenPassword(evt){
    evt.preventDefault();
    var uname = evt.target[1].defaultValue.toLowerCase();
    var session_url = `http://localhost:8080/social_reach/users/reset_password/${uname}/?format=json`;
    axios.get(session_url)
    .then(res =>{
      this.setState({
        forgottenPassword: true,
        data: res.data,
      })
}).catch(function(error){
 console.log(error);
 console.log("Error sending password reset email.");
})
}

handlePasswordResetSubmit(evt){
  console.log(evt.target);
  evt.preventDefault();
  var uid = this.state.reset_uid
  console.log(uid);
  var token = this.state.reset_token
  var uname = evt.target[1].defaultValue.toLowerCase();
  var password = evt.target[2].defaultValue;
  var email = evt.target[6].value;
  console.log(email);
  console.log(uname);
  console.log(password);
  var reset_url = `http://localhost:8080/social_reach/users/reset_password/${uid}/${token}`
   axios.put(`${reset_url}/?format=json`, {
     'username': uname,
     'password': password,
     'email': email
   }).then(function (response) {
    this.setState({
      resetPasswordSubmitted: true,
    })
}).catch(function(error){
console.log(error);
console.log("Error resetting password");
})
}

  //authentication
  handleLoginSubmit(evt){
    evt.preventDefault();
    this.setState({
      signup_load: 'loader'
    })

  var session_url = 'http://localhost:8080/social_reach/jwt_login/';
  var uname = evt.target[1].defaultValue.toLowerCase();
  var pass = evt.target[2].defaultValue;
  // self = this , a workaround to access 'this' within axios
  var self = this;
  this.setState({
    username: uname,
    password: pass
  })
  axios.post(session_url, {
      'username': uname,
      'password': pass
    }).then(function(response) {
      console.log('response:', response);
    console.log('Obtained token.');
    var token = response.data['token']
    axios.post(`http://localhost:8080/social_reach/auth-jwt-verify/`,  {
        "token": token,
        'username': uname,
        'password': pass
      }).then(function(second_response) {

        console.log(second_response);
        var verified_token = second_response.data['token']
        console.log("VER TOKEN", verified_token);
       axios.get(`http://localhost:8080/social_reach/profiles/${uname}/?format=json`, { headers: { Authorization: `JWT ${verified_token}` } })
       .then(res =>{
         self.setState({
           login: true,
           data: res.data,
           loggedInAs: uname,
           reroute: true
         })
          return <Redirect to='/profile' data={self.state.data} loggedInAs={self.state.loggedInAs} login= {self.state.login}/>

  }).catch(function(error){
    console.log(error);
    console.log("Error on authentication");
  })})}).catch(function(error) {
    console.log(error);
  });

  }

  handleLoginFromRegistrationSubmit(username, password){



  var session_url = 'http://localhost:8080/social_reach/api/auth/token/obtain/';

  // self = this , a workaround to access 'this' within axios
  var self = this;
  console.log(username);
  console.log(password);
  // catch error and put to screen
   self.setState({
     username: username.toLowerCase(),
     password: password
   })
  axios.post(session_url, {
      'username': username,
      'password': password
    }).then(function(response) {
      console.log(response);
    console.log('Authenticated');
    var token = response.data['access']
       axios.get(`http://localhost:8080/social_reach/profiles/${username}/?format=json`, { headers: { Authorization: `Bearer ${token}` } })
       .then(res =>{
         self.setState({
           login: true,
           data: res.data,
           loggedInAs: username,
            reroute: true
         })
           return <Redirect to='/profile' data={self.state.data} loggedInAs={self.state.loggedInAs} login= {self.state.login}/>
  }).catch(function(error){
    console.log(error);
    console.log("Error on authentication");
  })}).catch(function(error) {
    console.log(error);
  });

  }




  handleSignUpSubmit(evt){
      evt.preventDefault();
      var self = this;

      var signup_username = evt.target[1].defaultValue.toLowerCase();
      var signup_password = evt.target[2].defaultValue
      var signup_email = evt.target[4].defaultValue
      console.log(signup_email);
      var new_user_url = 'http://localhost:8080/social_reach/auth/users/create'
      axios.post(new_user_url, {
        username: signup_username,
        password: signup_password,
        email: signup_email
      }).then(()=>{
        self.setState({
          signUpSubmit: true,

        })
        self.set_signUpPassword(signup_password)
      }).catch(function(e){
        self.setState({

          message: ' BAD! something is wrong with password or email address'
        })

        console.log(e);
      })

  }


  render() {
    if (this.state.login === true){
      return (

              // <Profile data={this.state.data} loggedInAs={this.state.loggedInAs} />

            <Router>
              <React.Fragment>
                <Navbar logout={this.handleLogOut}/>
                <Route exact path="/" render={(props)=> <Landing handleLoginSubmit= {this.handleLoginSubmit} handleSignUpSubmit = {this.handleSignUpSubmit} handleForgottenPassword = {this.handleForgottenPassword} login={this.state.login_required} reroute={this.state.reroute} signup_load={this.state.signup_load}/>}/>
                <Route exact path="/activate/:id/:token" render={(props)=> <Register  data={props} handleLoginFromRegistrationSubmit = {this.handleLoginFromRegistrationSubmit} signUpPassword = {this.signUpPassword} info= {this.state.data}/>}/>
                <Route exact path="/reset_password/:id/:token" render={(props) => <PasswordReset {...props} handlePasswordResetSubmit = {this.handlePasswordResetSubmit} get_uniqueID = {this.get_uniqueID} get_reset_token = {this.get_reset_token} data={props}/>}/>
                <Route path="/Profile" render={(props) =>  <Profile data={this.state.data} loggedInAs={this.state.loggedInAs} />} />
                <Route path="/publicProfile" render={(props) =>  <PublicProfile data={this.state.data} loggedInAs={this.state.loggedInAs} />} />
                <Route path="/reachout" render={(props) =>  <SearchUsers data={this.state.data} loggedInAs={this.state.loggedInAs} login= {this.state.login} />} />


              </React.Fragment>
            </Router>


      )

    }if (this.state.signUpSubmit === true){
      return (
        <h6>We are now processing your registration! Activate via the email you have just been sent.</h6>
      )
    }
    if (this.state.forgottenPassword === true){
      return (
        <h6>Reset your password via the link in the email you have just been sent.</h6>
      )
    }

    if (this.state.resetPasswordSubmitted === true){
      return (
        <h6>Success! You can now log in again with your new password.</h6>
      )
    }

    else{
    return (
      <Router>
        <React.Fragment>
          <Navbar logout={this.handleLogOut}/>
          <Route exact path="/" render={()=> <Landing handleLoginSubmit= {this.handleLoginSubmit} handleSignUpSubmit = {this.handleSignUpSubmit} handleForgottenPassword = {this.handleForgottenPassword} login={this.state.login_required} reroute={this.state.reroute} signup_load={this.state.signup_load} message={this.state.message}/>}/>
          <Route exact path="/activate/:id/:token" render={(props)=> <Register  data={props} handleLoginFromRegistrationSubmit = {this.handleLoginFromRegistrationSubmit} signUpPassword = {this.signUpPassword} info= {this.state.data}/>}/>
          <Route exact path="/reset_password/:id/:token" render={(props) => <PasswordReset {...props} handlePasswordResetSubmit = {this.handlePasswordResetSubmit} get_uniqueID = {this.get_uniqueID} get_reset_token = {this.get_reset_token} data={props}/>}/>
          <Route path="/Profile" render={(props) =>  <Profile data={this.state.data} loggedInAs={this.state.loggedInAs} login= {this.state.login} />} />
          <Route path="/publicprofile" render={(props) =>  <Profile data={this.state.data} loggedInAs={this.state.loggedInAs} login= {this.state.login} />} />
          <Route path="/reachout" render={(props) =>  <Profile data={this.state.data} loggedInAs={this.state.loggedInAs} login= {this.state.login} />} />

        </React.Fragment>
      </Router>
    )};
  }
}

export default Main;
