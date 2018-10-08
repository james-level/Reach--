import React, { Component } from "react";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Register from "./Register";
import Profile from "./Profile";
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

class Main extends Component {

componentDidMount(){
var session_url = 'http://localhost:8080/social_reach/api/auth/token/obtain/';
var uname = 'jamesbond007';
var pass = 'p';
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

  // componentDidMount(){
  //   console.log("hi");
  //   axios.get('http://localhost:8080/social_reach/profiles/?format=json')
  //   .then(res =>{
  //     console.log(res);
  //   }) //only runs when completed response
  // }
  constructor(props) {
    super(props);
    this.state = {
      pricing: [
        { level: "Hobby", cost: 0 },
        { level: "Startup", cost: 10 },
        { level: "Enterprise", cost: 100 }
      ]
    };
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          {/* <Route path="/Landing" component={Landing} /> */}
          <Route path="/Register" component={Register} />
          <Route path="/Profile" component={Profile} />
        </React.Fragment>
      </Router>
    );
  }
}

export default Main;
