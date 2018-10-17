import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom'
import PasswordMask from 'react-password-mask';

import axios from 'axios';





class Landing extends React.Component{
  constructor(props) {
  super(props);

  this.state = {
    username: '',
    password: '',
    signup_username: '',
    signup_password: '',
    signup_email: '',
    usernameForReset: '',
    load: ''
  };

 // this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
 this.handleUsernameChange = this.handleUsernameChange.bind(this)
 this.handlePasswordChange = this.handlePasswordChange.bind(this)
 this.handleSignUpUsernameChange = this.handleSignUpUsernameChange.bind(this)
 this.handleSignUpPasswordChange = this.handleSignUpPasswordChange.bind(this)
 this.handleSignUpEmailChange = this.handleSignUpEmailChange.bind(this)
 this.handleResetPasswordUsernameChange = this.handleResetPasswordUsernameChange.bind(this)



}


handleUsernameChange(evt){
  this.setState({ username: evt.target.value})

}

handlePasswordChange(evt){
  this.setState({ password: evt.target.value})
}

handleSignUpUsernameChange(evt){
  this.setState({ signup_username: evt.target.value})
}

handleSignUpPasswordChange(evt){
  this.setState({ signup_password: evt.target.value})
}

handleSignUpEmailChange(evt){
  this.setState({ signup_email: evt.target.value})
}

handleResetPasswordUsernameChange(evt){
  this.setState({ usernameForReset: evt.target.value })
}





render(){
   //  console.log(this.props.reroute);

   const load = this.props.signup_load

    if (this.props.reroute === true){
     return <Redirect to='/profile' data={this.state} loggedInAs={this.state.username} login= {true}/>
   }





  return(


  <div className="landing">


{/* REACH LOGO START  */}
    <div class="app-title">
      <span class="letter" data-letter="R">R</span>
      <span class="letter" data-letter="E">E</span>
      <span class="letter" data-letter="A">A</span>
      <span class="letter" data-letter="C">C</span>
      <span class="letter" data-letter="H">H</span>

    </div>
{/* REACH LOGO END */}


{/* TAG LINE START */}
    <h3 className="tag-line"><i>The social app for social people</i></h3>
{/* TAG LINE END  */}


{/* LANDING IMAGE START */}
    <img className="landing-image" src="/images/app_images/girl.jpg" alt="girl-on-mobile-phone"></img>
{/* LANDING IMAGE END */}




{/* SIGN UP MODAL START & REGISTER NEW USER BUTTONS START */}
<div class="modal fade" data-backdrop="false" id="modalSignUpForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
          <form onSubmit={this.props.handleSignUpSubmit}>
              <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">Sign Up!</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body mx-4">

                  <div class="md-form mb-5">
                      <i class="fa fa-envelope prefix grey-text"></i>
                      <input type="text" required name="username" value={this.state.signup_username} onChange={this.handleSignUpUsernameChange} id="defaultForm-signup_username" placeholder="desired username"></input>
                      <label name="signup_username" for="defaultForm-signup_username"  ></label>
                  </div>

                  <div class="md-form mb-4">
                      <i class="fa fa-lock prefix grey-text"></i>
                      <PasswordMask id="password"  name="password" value={this.state.signup_password}
           onChange={this.handleSignUpPasswordChange} id="defaultForm-pass" class="form-control validate" required placeholder="password min length 8 characters"/>
                      {/* <input type="password" name="password" value={this.state.signup_password} onChange={this.handleSignUpPasswordChange} id="defaultForm-pass" class="form-control validate" placeholder="password min length 8 characters"></input> */}
                      <label for="defaultForm-pass"></label>
                  </div>
                  <div class="md-form mb-3">
                      <i class="fa fa-lock prefix grey-text"></i>
                      <input type="text" name="email" required value={this.state.signup_email} onChange={this.handleSignUpEmailChange} id="defaultForm-pass" class="form-control validate" placeholder="email address"></input>
                      <label for="defaultForm-pass"></label>
                  </div>

              </div>
              <div class="modal-footer d-flex justify-content-center">


                  <button  type='submit'  class="btn btn-default">Continue</button>

              </div>
              <p align='center'>  {this.props.message}</p>

              </form>

          </div>
      </div>
  </div>
{/* LOGIN MODAL START  */}
<div class="modal fade" data-backdrop="false" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
          <form onSubmit={this.props.handleLoginSubmit}>
              <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">Sign In</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body mx-3">

                  <div class="md-form mb-5">
                      <i class="fa fa-envelope prefix grey-text"></i>
                      <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange} id="defaultForm-username" class="form-control validate" placeholder="username"></input>
                      <label name="username"  for="defaultForm-username"  ></label>
                  </div>

                  <div class="md-form mb-4">
                      <i class="fa fa-lock prefix grey-text"></i>
                      <PasswordMask id="password" name="password" value={this.state.password}
           onChange={this.handlePasswordChange} id="defaultForm-pass" class="form-control validate" placeholder="password"/>

                      <label  for="defaultForm-pass"></label>
                  </div>


              </div>
              <div class="modal-footer d-flex justify-content-center">
                  <button  type='submit'  class="btn btn-default">Login</button>
              </div>
              </form>

          </div>
      </div>
  </div>

  <div class="modal fade" data-backdrop="false" id="modalPasswordReset" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form onSubmit={this.props.handleForgottenPassword}>
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100 font-weight-bold">Reset my password!</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mx-3">

                    <div class="md-form mb-5">
                        <i class="fa fa-envelope prefix grey-text"></i>
                        <input type="text" name="username" value={this.state.usernameForReset} onChange={this.handleResetPasswordUsernameChange} id="defaultForm-username" class="form-control validate" placeholder="Enter your username"></input>
                        <label name="username" for="defaultForm-username"  ></label>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button  type='submit'  class="btn btn-default">Send reset email</button>
                </div>
                </form>

            </div>
        </div>
    </div>


{/*  LOG IN & REGISTER NEW USER BUTTONS START */}
  <div class="text-center">
      <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalLoginForm">Sign In</a>
      <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalSignUpForm">Sign Up!</a>
      {/* <a href="/register" class="btn btn-default btn-rounded mb-4">Sign Up</a> */}
  </div>
{/* LOG IN & REGISTER NEW USER BUTTONSEND */}

{/* LOG IN & REGISTER NEW USER BUTTONS START */}
  <div class="text-center">
      <a href="" class="" data-toggle="modal" data-target="#modalPasswordReset">Forgotten password?</a>
  </div>





</div>
);
}


}

export default Landing;
