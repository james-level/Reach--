import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import { Link } from 'react-router-dom'



class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password_one: '',
      password_two: '',
      email: '',
    };


    this.uid = props.match.params.id;
    this.token = props.match.params.token;

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handlePasswordTwoChange = this.handlePasswordTwoChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)

  }

  handleUsernameChange(evt){
    this.setState({ username: evt.target.value})
  }

  handlePasswordChange(evt){
    this.setState({ password_one: evt.target.value})
  }

  handlePasswordTwoChange(evt){
    this.setState({ password_two: evt.target.value})
  }

  handleEmailChange(evt){
    this.setState({ email: evt.target.value})
  }

  componentDidMount(){

    this.props.get_reset_token(this.token)
    this.props.get_uniqueID(this.uid)

  }

  render() {

    if ((this.state.password_one.length > 0
    || this.state.password_two.length > 0)
    && this.state.password_two !== this.state.password_one){

    return(

              <div class="modal-content">
              <form  onSubmit={this.props.handlePasswordResetSubmit}>
                  <div class="modal-header text-center">
                      <h4 class="modal-title w-100 font-weight-bold">Reset your password!</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body mx-4">

                      <div class="md-form mb-5">
                          <i class="fa fa-envelope prefix grey-text"></i>
                          <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange} id="defaultForm-signup_username" class="form-control validate" placeholder="your username"></input>
                          <label name="signup_username" data-error="wrong" data-success="right" for="defaultForm-signup_username"  ></label>
                      </div>

                      <div class="md-form mb-4">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="password" name="password" value={this.state.password_one} onChange={this.handlePasswordChange} id="defaultForm-pass" class="form-control validate" placeholder="password min length 8 characters"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>
                      <div class="md-form mb-4">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="password" name="password" value={this.state.password_two} onChange={this.handlePasswordTwoChange} id="defaultForm-pass" class="form-control validate" placeholder="re-type password"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>
                      <div class="md-form mb-3">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} id="defaultForm-pass" class="form-control validate" placeholder="your email address"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>
                      <h5 align="center" style={{fontWeight: "bold", color: "#8B0000"}}>The two passwords have to match</h5>


                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                      <button  type='submit'  class="btn btn-default">Reset password</button>
                  </div>
                  </form>

              </div>

    )

  }

  else {

    return(

              <div class="modal-content">
              <form  onSubmit={this.props.handlePasswordResetSubmit}>
                  <div class="modal-header text-center">
                      <h4 class="modal-title w-100 font-weight-bold">Reset your password!</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body mx-4">

                      <div class="md-form mb-5">
                          <i class="fa fa-envelope prefix grey-text"></i>
                          <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange} id="defaultForm-signup_username" class="form-control validate" placeholder="your username"></input>
                          <label name="signup_username" data-error="wrong" data-success="right" for="defaultForm-signup_username"  ></label>
                      </div>

                      <div class="md-form mb-4">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="password" name="password" value={this.state.password_one} onChange={this.handlePasswordChange} id="defaultForm-pass" class="form-control validate" placeholder="password min length 8 characters"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>
                      <div class="md-form mb-4">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="password" name="password" value={this.state.password_two} onChange={this.handlePasswordTwoChange} id="defaultForm-pass" class="form-control validate" placeholder="re-type password"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>
                      <div class="md-form mb-3">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} id="defaultForm-pass" class="form-control validate" placeholder="your email address"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>

                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                   <button  type='submit'  class="btn btn-default">Reset password</button>
                  </div>
                  </form>

              </div>

    )
  }

  }}

  export default PasswordReset;
