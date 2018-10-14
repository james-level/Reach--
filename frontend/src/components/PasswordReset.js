import React, { Component } from "react";



class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password_one: '',
      password_two: '',
      email: '',
      submitted: false,
    };

  }

  render() {
    return(

              <div class="modal-content">
              <form onSubmit={this.props.handleSignUpSubmit}>
                  <div class="modal-header text-center">
                      <h4 class="modal-title w-100 font-weight-bold">Reset your password!</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body mx-4">

                      <div class="md-form mb-5">
                          <i class="fa fa-envelope prefix grey-text"></i>
                          <input type="text" name="username" value={this.state.signup_username} onChange={this.handleSignUpUsernameChange} id="defaultForm-signup_username" class="form-control validate" placeholder="desired username"></input>
                          <label name="signup_username" data-error="wrong" data-success="right" for="defaultForm-signup_username"  ></label>
                      </div>

                      <div class="md-form mb-4">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="text" name="password" value={this.state.signup_password} onChange={this.handleSignUpPasswordChange} id="defaultForm-pass" class="form-control validate" placeholder="password min length 8 characters"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>
                      <div class="md-form mb-4">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="text" name="password" value={this.state.signup_password} onChange={this.handleSignUpPasswordChange} id="defaultForm-pass" class="form-control validate" placeholder="re-type password"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>
                      <div class="md-form mb-3">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="text" name="email" value={this.state.signup_email} onChange={this.handleSignUpEmailChange} id="defaultForm-pass" class="form-control validate" placeholder="email address"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>

                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                      <button  type='submit'  class="btn btn-default">Continue</button>
                  </div>
                  </form>

              </div>

    )


  }}

  export default PasswordReset;
