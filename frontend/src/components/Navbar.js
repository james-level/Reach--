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
      <div className="reach_table">
      <ul className="nav-bar">
        <li>
          <Link to="/usersection"><img src="/images/app_images/image.png" alt="home icon" width="35" height="35"></img></Link>
        </li>
        <li>
          <Link to="/results">
          <div class="circles"><img src="./images/app_images/pushbutton.svg" width="35" height="35"/>
            <div class="circle1"><div></div></div>
            <div class="circle2"><div></div>
            </div>
          </div>
          </Link>
        </li>
        <li>
          <Link to="/" onClick={this.props.logout}><img src="/images/app_images/signout.png" alt="home icon" width="35" height="35"></img></Link>
        </li>
      </ul>
    </div>

    )
  }
}


export default Navbar;
