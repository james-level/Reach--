import React, { Component } from "react";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Register from "./Register";
import Profile from "./Profile";

import { BrowserRouter as Router, Route } from "react-router-dom";

class Main extends Component {
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
