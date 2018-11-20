import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props);


  }


  render(){
    console.log(this.props);

    return(
      <ul className="nav-bar">
        <li>
          <Link to="/usersection"><img src="/images/app_images/usericon.svg" alt="home icon" width="40" height="40"></img></Link>
        </li>
        <li>
          <Link to="/results"><img src="/images/app_images/pushbutton.svg" alt="search icon" width="40" height="40"></img></Link>
        </li>
        <li>
          <Link to="/chatapp"><img src="/images/app_images/messagesicon.svg" alt="message icon" width="40" height="40"></img></Link>
        </li>
        <li>
          <Link to="/matchanimation"><img src="/images/app_images/match.svg" alt="match icon" width="40" height="40"></img></Link>
        </li>
        <li>
          <Link to="/" onClick={this.props.logout}><img src="/images/app_images/loginicon.svg" alt="exit icon" width="40" height="40"></img></Link>
        </li>
      </ul>

    )
  }
}


export default Navbar;
