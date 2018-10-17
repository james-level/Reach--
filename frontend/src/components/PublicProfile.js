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

                    <div className="public-profile">

                      <p> Yo bitch </p>

                      {/* Photo Carousel */}
                      <div class="gallery" data-flickity='{ "cellAlign": "left", "contain": true }'>
                        <img class="gallery-cell" src="../images/app_images/user1.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user2.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user3.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user 4.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user 5.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/user6.jpeg"></img>
                      </div>


                      <h2>
                        Name{this.props.loggedInAs},
                        Age {this.props.data.date_of_birth},
                        Gender: {this.props.data.gender_identity}
                      </h2>

                      <h4>
                        {this.props.data.bio}
                      </h4>

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


export default PublicProfile;
