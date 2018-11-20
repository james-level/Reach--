import React, { Component } from "react";

class MatchAnimation extends Component {
  constructor(props) {
    super(props);

    };

        render() {

            console.log("MATCH ANIMATION RUNNING RENDER");
            console.log("liked user PICTURE", localStorage.getItem('liked_user_picture'));

          if (this.props.loggedInAs && localStorage.getItem('liked_profile')){

            return (
              <div class="z-carousel z-state-matched z-state-reveal-match">
          <div class="mod-body">


              <div class="z-matched-content-photo-container">
                  <div class="z-card z-state-card-self">
                      <div class="z-card-photo">
                          <img alt="" class="flex-img js-other-photo" src={this.props.data.picture}></img>
                      </div>
                      <div class="z-card-panel">
                          <ul class="edge-unit">
                              <li class="valign-mid">
                                  <span class="z-card-min-info">
                                  {this.props.data.name} ({this.props.data.location})
                                  </span>
                              </li>
                          </ul>
                      </div>



                  </div>
                  <div class="z-card z-state-card-match">
                      <div class="z-card-front">
                                        <div class="z-card-photo">
                          <img alt="" class="flex-img js-other-photo" src={localStorage.getItem('liked_user_picture')}></img>
                      </div>
                      <div class="z-card-panel">
                          <ul class="edge-unit">
                              <li class="valign-mid">
                                  <span class="z-card-min-info">Match {localStorage.getItem('liked_user_name')} (X Miles away)</span>
                              </li>
                              <li>
                                  <span class="z-card-min-info">Age: X</span>
                              </li>
                          </ul>
                      </div>
                      </div>
                      <div class="z-card-back"></div>
                  </div>
              </div>

              <button class="direct-message-button">
                <img src="./images/app_images/directmessage.png" height="100" width="100"/>
              </button>


              <div class="z-matched-content-container">
                  <div class="equal-action-container">
                      <button class="back-to-results-button">Back To Search</button>
                      <button class="back-to-results-button">View This Profile</button>
                  </div>
              </div>
          </div>
      </div>

    )

  }
  else {
    return <div className="center"> Oops! Sorry - You need to log in  </div>
  }
}}


  export default MatchAnimation;
