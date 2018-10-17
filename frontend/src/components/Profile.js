import React, { Component } from "react";
import $ from 'jquery';


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

  total_reach(){
    return this.props.data.instagram_followers + this.props.data.twitter_followers + this.props.data.youtube_followers
  }


  render(){
    console.log(this.props);
//ternary to either display profile or log in message
  const post = this.props.loggedInAs  ? (

                    <div className="profile">
                     <script type="text/javascript" src="reach_pie_chart.js"></script>
                     <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>


                    <img className="landing-image" src="/images/app_images/user-profile-icon.png" alt="user-profile-icon" ></img>

                    <h2> {this.props.loggedInAs}, born on {this.props.data.date_of_birth}, gender identity {this.props.data.gender_identity}</h2>

                    <h4> {this.props.data.bio}</h4>

                    <h4> Total Reach: {this.total_reach()}</h4>

                    <div id="doughnutChart" class="chart"></div>

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
