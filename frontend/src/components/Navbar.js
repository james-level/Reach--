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
          <Link to="/"><img src="../images/app_images/homeicon.png" alt="home icon" width="25" height="25"></img></Link>
        </li>
        <li>
          <Link to="/profile">Deck View</Link>
        </li><li>
          <Link to="/publicprofile">Edit Profile</Link>
        </li>
        <li>
          <Link to="/settings"><img src="../images/app_images/settingsicon.png" alt="home icon" width="25" height="25"></img></Link>
        </li>
        <li>
          <Link to="/browse">Browse</Link>
        </li>
        <li>
          <Link to="/updateReach">Update Reach</Link>
        </li>
        <li>
          <Link to="/" onClick={this.props.logout}><img src="../images/app_images/signout.png" alt="home icon" width="25" height="25"></img></Link>
        </li>
      </ul>

    )
  }
}


export default Navbar;
