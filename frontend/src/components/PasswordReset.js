import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import { Link } from 'react-router-dom'
import PasswordMask from 'react-password-mask';
import axios from 'axios';



class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password_one: '',
      password_two: '',
      email: '',
      reset: false,
      reset_user: null
    };


    this.uid = props.match.params.id;
    this.token = props.match.params.token;

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handlePasswordTwoChange = this.handlePasswordTwoChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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

  handleSubmit(evt){
    this.props.handlePasswordResetSubmit(evt)
    this.setState({ reset: true})
    console.log(this.state.reset_user.email);
  }

  componentDidMount(){

    this.props.get_reset_token(this.token)
    this.props.get_uniqueID(this.uid)

    var self = this;
    var uid = this.uid
    console.log(uid);
    var token = this.token
    console.log(token);
    var url = `http://localhost:8080/social_reach/auth/users/getreset/${uid}/${token}`
     axios.get(`${url}/?format=json`).then(function (response) {
          self.setState({
            reset_user: response.data.user
          })
      }).catch(function (error) {
              console.log(error);
      });


  }

  render() {

    var inputStyles = {
      marginLeft: '2.5rem',
      width: 'calc(100% - 2.5rem)'
      // fontSize: '0.8em'
    };

    var buttonStyles = {
      position: 'absolute',
     top: '50%',
     right: '0.1em',
     marginTop: '-13px',
     padding: '4px 10px',
     background: 'rgb(43, 187, 173)',
     borderRadius: '2px',
     color: 'rgb(255, 255, 255)',
     textAlign: 'center',
     textDecoration: 'none',
     textTransform: 'uppercase',
     userSelect: 'none',
     display: 'inline',
     fontSize: '0.7em'
    }

    if (this.state.reset_user == null) {
      return <div><p>Loading...</p></div>
    }

    if ((this.state.password_one.length > 0
    || this.state.password_two.length > 0)
    && this.state.password_two !== this.state.password_one){

    return(

<div class="modal-dialog" role="document">
              <div class="modal-content">
              <form  onSubmit={this.handleSubmit}>
                  <div class="modal-header text-center">
                      <h4 class="modal-title w-100 font-weight-bold">Reset your Reach password, {this.state.reset_user.username}!</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body mx-4">

                       <div class="md-form mb-5">
                            <i class="fa fa-envelope prefix grey-text"></i>
                            <input type="text" required name="username" value={this.state.reset_user.username} onChange={this.handleUsernameChange} id="defaultForm-signup_username" ></input>
                            <label name="signup_username" for="defaultForm-signup_username"  ></label>
                        </div>

                      <div class="md-form mb-4">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <PasswordMask type="text" id="password"  name="password" value={this.state.password_one}
               onChange={this.handlePasswordChange} id="defaultForm-pass" class="form-control validate" required placeholder="choose a new password" useVendorStyles={false} buttonStyles={buttonStyles} inputStyles={inputStyles}/>
                          <label for="defaultForm-pass"></label>
                      </div>

                      <div class="md-form mb-4">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <PasswordMask type="text" id="password"  name="password" value={this.state.password_two}
               onChange={this.handlePasswordTwoChange} id="defaultForm-pass" class="form-control validate" required placeholder="re-type password" useVendorStyles={false} buttonStyles={buttonStyles} inputStyles={inputStyles}/>
                          <label for="defaultForm-pass"></label>
                      </div>
                      <div class="md-form mb-3">
                          <i class="fa fa-lock prefix grey-text"></i>
                          <input type="text" name="email" value={this.state.reset_user.email} onChange={this.handleEmailChange} id="defaultForm-pass" class="form-control validate" placeholder="your email address"></input>
                          <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                      </div>
                      <h5 align="center" style={{fontWeight: "bold", color: "#8B0000"}}>The two passwords have to match</h5>


                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                      <button  type='submit'  class="btn btn-default">Reset password</button>
                  </div>
                  </form>

              </div>
              </div>

    )

  }

  if (this.state.reset === true){
    return (
      <h6>Success! You can now log in again with your new password.</h6>
    )
  }

  else {

    return(

<div class="modal-dialog" role="document">
              <div class="modal-content">
              <form  onSubmit={this.handleSubmit}>
              <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">Reset your Reach password, {this.state.reset_user.username}!</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body mx-4">

                   <div class="md-form mb-5">
                        <i class="fa fa-envelope prefix grey-text"></i>
                        <input type="text" required name="username" value={this.state.reset_user.username} onChange={this.handleUsernameChange} id="defaultForm-signup_username" ></input>
                        <label name="signup_username" for="defaultForm-signup_username"  ></label>
                    </div>

                  <div class="md-form mb-4">
                      <i class="fa fa-lock prefix grey-text"></i>
                      <PasswordMask type="text" id="password"  name="password" value={this.state.password_one}
           onChange={this.handlePasswordChange} id="defaultForm-pass" class="form-control validate" required placeholder="choose a new password" useVendorStyles={false} buttonStyles={buttonStyles} inputStyles={inputStyles}/>
                      <label for="defaultForm-pass"></label>
                  </div>

                  <div class="md-form mb-4">
                      <i class="fa fa-lock prefix grey-text"></i>
                      <PasswordMask type="text" id="password"  name="password" value={this.state.password_two}
           onChange={this.handlePasswordTwoChange} id="defaultForm-pass" class="form-control validate" required placeholder="re-type password" useVendorStyles={false} buttonStyles={buttonStyles} inputStyles={inputStyles}/>
                      <label for="defaultForm-pass"></label>
                  </div>
                  <div class="md-form mb-3">
                      <i class="fa fa-lock prefix grey-text"></i>
                      <input type="text" name="email" value={this.state.reset_user.email} onChange={this.handleEmailChange} id="defaultForm-pass" class="form-control validate" placeholder="your email address"></input>
                      <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                  </div>
                  <h5 align="center" style={{fontWeight: "bold", color: "#8B0000"}}>The two passwords have to match</h5>


              </div>
                  <div class="modal-footer d-flex justify-content-center">
                   <button  type='submit'  class="btn btn-default">Reset password</button>
                  </div>
                  </form>

              </div>
              </div>

    )
  }

  }}

  export default PasswordReset;
