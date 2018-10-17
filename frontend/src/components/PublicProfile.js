import React, { Component } from "react";
import Flickity from 'flickity';


class PublicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
      data: {}
    };
  }

  render(){
    console.log(this.props);
      const post = this.props.loggedInAs  ? (

                    <div class="public-profile">

                      {/* Profile Info */}
                      <fieldset>
                        <legend><span class="number"></span> {this.props.loggedInAs} </legend>
                        <label type="date">Born: {this.props.data.date_of_birth}</label>
                        <label type="text">Gender: {this.props.data.gender_identity}</label>
                      </fieldset>

                      <fieldset>
                        <legend><span class="number"></span> About </legend>
                        <label type="text">{this.props.data.bio}</label>
                      </fieldset>

                      <fieldset>
                        <legend><span class="number"></span> Interests </legend>
                        <label type="text"> ⚽️ 🐶 🥩 </label>
                      </fieldset>

                      {/* Photo Carousel */}
                      <fieldset>
                        <legend><span class="number"></span> Selfie Centre </legend>
                      <div class="gallery" data-flickity='{ "cellAlign": "left", "contain": true }'>
                        <img class="gallery-cell" src="../images/app_images/user1.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user2.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user3.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user 4.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user 5.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user6.jpeg"></img>
                      </div>
                      </fieldset>

                    </div>

                  ) : (
                    <div className="center"> Oops! You need to log in :/ </div>
                  )

                  return(
                    <div className="container">
                    {post}
                    </div>

                    )
                  }
                  }


export default PublicProfile;
