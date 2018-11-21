import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import MatchedProfile from './MatchedProfile.js'


class MatchAnimation extends Component {
  constructor(props) {
    super(props);

    this.state = {

      viewProfileClicked: null

    }

    this.handleViewProfileClick = this.handleViewProfileClick.bind(this);

    };


    handleViewProfileClick(){

      this.setState({

        viewProfileClicked: true

      })

    }

    removeQuotationMarksFromLikedUserPhoto(){
      console.log("formatted photo", localStorage.getItem('liked_user_picture').replace(/^"(.*)"$/, '$1'));
      return localStorage.getItem('liked_user_picture').replace(/^"(.*)"$/, '$1')
    }

        render() {

            const getAge = require('get-age');

            console.log("MATCH ANIMATION RUNNING RENDER");
            console.log("liked user PICTURE", localStorage.getItem('liked_user_picture'));
            console.log("LIKER user PICTURE", this.props.data.picture);

          if (this.props.loggedInAs && this.props.likedUser && !this.state.resultsRedirectClicked && !this.state.viewProfileClicked){

            return (
              <div>
              <div class="z-carousel z-state-matched z-state-reveal-match">
          <div class="mod-body">

            <div className="profile" style={{maxWidth:'600'}}>

            <fieldset>

            <label className="total-reach" type="text">You matched!</label>


            </fieldset>

            </div>


              <div class="z-matched-content-photo-container">
                  <div class="z-card z-state-card-self">
                      <div class="z-card-photo">
                          <img alt="" class="flex-img js-other-photo" src={this.props.data.picture}></img>
                      </div>
                      <div class="z-card-panel" style={{textAlign: 'center', justifyContent: 'center'}}>
                          <ul class="edge-unit" style={{textAlign: 'center', justifyContent: 'center'}}>
                              <li class="valign-mid" style={{textAlign: 'center'}}>
                                  <span class="z-card-min-info" style={{fontSize: 16}}>
                                  {this.props.data.name}
                                  </span>
                              </li>
                          </ul>
                      </div>



                  </div>
                  <div class="z-card z-state-card-match">
                      <div class="z-card-front">
                                        <div class="z-card-photo">
                          <img alt="" class="flex-img js-other-photo" src={this.props.likedUser.picture}></img>
                      </div>
                      <div class="z-card-panel">
                          <ul class="edge-unit">
                              <li class="valign-mid" style={{textAlign: 'center'}}>
                                  <span class="z-card-min-info" style={{fontSize: 16, textAlign: 'center'}}>{this.props.likedUser.name}, {getAge(this.props.likedUser.date_of_birth)}yrs, {this.props.distance}km from you</span>
                              </li>
                          </ul>
                      </div>
                      </div>
                      <div class="z-card-back"></div>
                  </div>
              </div>

              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <button class="direct-message-button" style={{borderColor: "transparent"}}>
                <img src="./images/app_images/directmessage.png" style={{borderColor: "transparent"}} height="100" width="100"/>
              </button>

              <br></br>


              <div class="z-matched-content-container">
                  <div class="equal-action-container">
                      <button onClick={this.props.resetMatchingState} class="back-to-results-button">Back To Search</button>
                      <button onClick={this.handleViewProfileClick} class="back-to-results-button">View Their Profile</button>
                  </div>
              </div>
          </div>
      </div>
      <br></br>
      </div>

    )
  }

  if (this.state.viewProfileClicked === true){
    console.log("LIKED PROF PROPS", this.props.likedUser);

   return (

     <MatchedProfile

       resetMatchingState={this.props.resetMatchingState}
       loggedInAs={this.props.loggedInAs}
       data={this.props.likedUser}
       distance={this.props.distance}
       login= {true}

     />

 )

  }

  else {
    return <div className="center"> Oops! Sorry - You need to log in  </div>
  }
}}


  export default MatchAnimation;
