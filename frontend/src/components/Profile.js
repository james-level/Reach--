import React, { Component } from "react";



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: this.props.login,
      data: {}
    };

  }



  render(){
    console.log(this.props);
//ternary to either display profile or log in message
  const post = this.props.loggedInAs  ? (

                    <div className="profile">

                    <img className="landing-image" src="/images/app_images/user-profile-icon.png" alt="user-profile-icon"></img>

                    <h2> {this.props.loggedInAs}, born on {this.props.data.date_of_birth}, gender identity {this.props.data.gender_identity}</h2>

                    <h4> {this.props.data.bio}</h4>

                    </div>

  ) : (
    <div className="center">Oops! You need to log in.</div>
  )

  return(
    <div className="container">
    {post}
    </div>


  )
}
}

export default Profile;
