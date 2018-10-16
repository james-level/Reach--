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
      return (
                    <div className="public-profile">

                      {/* Photo Carousel */}
                      <div class="gallery" data-flickity='{ "cellAlign": "left", "contain": true }'>
                        <img class="gallery-cell" src="../images/app_images/girlonphone.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/girlonphone.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/girlonphone.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/girlonphone.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/girlonphone.jpeg"></img>
                        <img class="gallery-cell" src="../images/app_images/girlonphone.jpeg"></img>
                      </div>


                      <h2>
                        {/* Name{this.props.loggedInAs},
                        Age {this.props.data.date_of_birth},
                        Gender: {this.props.data.gender_identity} */}
                      </h2>

                      <h4>
                        {/* {this.props.data.bio} */}
                      </h4>

                    </div>

                  )
  }
}

export default PublicProfile;
