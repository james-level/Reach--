import React, { Component } from "react";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Register from "./Register";
import Profile from "./Profile";
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

class Main extends Component {
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
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)
    console.log(this.props);
  }

  // login success
  login(){
    this.setState({
      login: true
    })
  }

  //authentication
  handleLoginSubmit(evt){
    evt.preventDefault();

  var session_url = 'http://localhost:8080/social_reach/api/auth/token/obtain/';
  var uname = evt.target[1].defaultValue;
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
      console.log(response);
    console.log('Authenticated');
    var token = response.data['access']
       axios.get(`http://localhost:8080/social_reach/users/${uname}/?format=json`, { headers: { Authorization: `Bearer ${token}` } })
       .then(res =>{
         self.setState({
           login: true,
           data: res.data
         })
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
      var signup_username = evt.target[1].defaultValue
      var signup_password = evt.target[2].defaultValue
      var signup_email = evt.target[3].defaultValue
      var new_user_url = 'http://localhost:8080/social_reach/auth/users/'
      axios.post(new_user_url, {
        username: signup_username,
        password: signup_password,
        email: signup_email
      }).then(()=>{
        self.setState({
          signUpSubmit: true
        })
      }).catch(function(e){
        console.log(e);
      })
      console.log(evt.target[1].defaultValue);
      console.log(evt.target[2].defaultValue);
      console.log(evt.target[3].defaultValue);

  }


  render() {
    if (this.state.login === true){
      return (

            <Profile data={this.state.data} />


      )

    }if (this.state.signUpSubmit === true){
      return (
        <h6>Sign up confirmed! Activate via the email you have just been sent.</h6>
      )

    }else{
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" render={()=> <Landing handleLoginSubmit= {this.handleLoginSubmit} handleSignUpSubmit = {this.handleSignUpSubmit}/>}/>
          <Route exact path="/activate/:id/:token" render={(props)=> <Register  data={props} handleLoginSubmit= {this.handleLoginSubmit} />}/>
          <Route path="/Register" component={Register} />
          <Route path="/Profile" component={Profile} />
        </React.Fragment>
      </Router>
    )};
  }
}

export default Main;
