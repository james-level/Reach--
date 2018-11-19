import React, { Component } from "react";

class MatchAnimation extends Component {
  constructor(props) {
    super(props);

    };

        render() {

          if (this.props.loggedInAs){

            return (
              <div class="z-carousel z-state-matched z-state-reveal-match">
          <div class="mod-body">


              <div class="z-matched-content-photo-container">
                  <div class="z-card z-state-card-self">
                      <div class="z-card-photo">
                          <img alt="" class="flex-img js-other-photo" src="http://cdn.marketplaceimages.windowsphone.com/v8/images/59fcf23e-18aa-4300-b590-065ffd4ab00c?imageType=ws_icon_large"></img>
                      </div>
                      <div class="z-card-panel">
                          <ul class="edge-unit">
                              <li class="valign-mid">
                                  <span class="z-card-min-info">User Name (Location)</span>
                              </li>
                          </ul>
                      </div>

                  </div>
                  <div class="z-card z-state-card-match">
                      <div class="z-card-front">
                                        <div class="z-card-photo">
                          <img alt="" class="flex-img js-other-photo" src="https://photov3zoosk-a.akamaihd.net/00275923765941083923/s320.jpg"></img>
                      </div>
                      <div class="z-card-panel">
                          <ul class="edge-unit">
                              <li class="valign-mid">
                                  <span class="z-card-min-info">User Name (Location)</span>
                              </li>
                              <li>
                                  <span class="z-card-min-info">Age: 28</span>
                              </li>
                          </ul>
                      </div>
                      </div>
                      <div class="z-card-back"></div>
                  </div>
              </div>

              <div class="z-matched-content-container">
                  <div class="equal-action-container">
                      <button class="button-v2 js-keep-playing-button" type="button">Back To Results</button>
                      <button class="button-confirm js-view-profile-button" type="button">View This Profile</button>
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
