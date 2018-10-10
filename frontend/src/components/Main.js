import React, { Component } from "react";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Register from "./Register";
import Profile from "./Profile";
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }

  //authentication
  handleLoginSubmit(evt){
    evt.preventDefault();
    console.log("Hello!");
  var session_url = 'http://localhost:8080/social_reach/api/auth/token/obtain/';
  var uname = evt.target[1].defaultValue;
  var pass = evt.target[2].defaultValue;
  axios.post(session_url, {
      'username': uname,
      'password': pass
    }).then(function(response) {
      console.log(response);
    console.log('Authenticated');
    var token = response.data['access']
    console.log(token);
       axios.get('http://localhost:8080/social_reach/profiles/?format=json', { headers: { Authorization: `Bearer ${token}` } })
       .then(res =>{
       console.log(res);
  }).catch(function(error){
    console.log("Error on authentication");
  })}).catch(function(error) {
    console.log('Error on Authentication');
  });

  }







  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" render={()=> <Landing handleLoginSubmit= {this.handleLoginSubmit} />}/>
          <Route path="/Register" component={Register} />
          <Route path="/Profile" component={Profile} />
        </React.Fragment>
      </Router>
    );
  }
}

export default Main;
