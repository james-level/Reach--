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
          <Link to="/usersection"><img src="/images/app_images/image.png" alt="home icon" width="25" height="25"></img></Link>
        </li>
        <li>
          <Link to="/results"><img src="/images/app_images/pushbutton.svg" alt="home icon" width="30" height="30"></img></Link>
        </li>
        <li>
          <Link to="/" onClick={this.props.logout}><img src="/images/app_images/signout.png" alt="home icon" width="25" height="25"></img></Link>
        </li>
      </ul>

    )
  }
}


export default Navbar;
