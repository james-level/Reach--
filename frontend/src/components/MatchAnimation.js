import React, { Component } from "react";
import { Redirect } from 'react-router-dom'


class MatchAnimation extends Component {
  constructor(props) {
    super(props);

    this.state = {

      resultsRedirectClicked: null

    }

    this.handleResultsClick = this.handleResultsClick.bind(this);

    };

    handleResultsClick(){

      this.setState({

        resultsRedirectClicked: true

      })

    }

    removeQuotationMarksFromLikedUserPhoto(){
      console.log("formatted photo", localStorage.getItem('liked_user_picture').replace(/^"(.*)"$/, '$1'));
      return localStorage.getItem('liked_user_picture').replace(/^"(.*)"$/, '$1')
    }

        render() {

            console.log("MATCH ANIMATION RUNNING RENDER");
            console.log("liked user PICTURE", localStorage.getItem('liked_user_picture'));
            console.log("LIKER user PICTURE", this.props.data.picture);

          if (this.props.loggedInAs && localStorage.getItem('liked_profile') && !this.state.resultsRedirectClicked){

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
                          <img alt="" class="flex-img js-other-photo" src={this.removeQuotationMarksFromLikedUserPhoto()}></img>
                      </div>
                      <div class="z-card-panel">
                          <ul class="edge-unit">
                              <li class="valign-mid">
                                  <span class="z-card-min-info">Match {localStorage.getItem('liked_user_name')} ({localStorage.getItem('liked_user_location')})</span>
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
                      <button onClick={this.handleResultsClick} class="back-to-results-button">Back To Search</button>
                      <button class="back-to-results-button">View This Profile</button>
                  </div>
              </div>
          </div>
      </div>

    )

  }

  if (this.state.resultsRedirectClicked === true){
   return <Redirect to='/results' data={this.props.data} loggedInAs={this.state.username} login= {true}/>
  }

  else {
    return <div className="center"> Oops! Sorry - You need to log in  </div>
  }
}}


  export default MatchAnimation;
