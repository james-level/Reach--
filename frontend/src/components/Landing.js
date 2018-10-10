import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';





class Landing extends React.Component{
  constructor(props) {
  super(props);

  this.state = {
    username: '',
    password: ''
  };

 // this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
 this.handleUsernameChange = this.handleUsernameChange.bind(this)
 this.handlePasswordChange = this.handlePasswordChange.bind(this)

}

handleUsernameChange(evt){
  this.setState({ username: evt.target.value})

}

handlePasswordChange(evt){
  this.setState({ password: evt.target.value})
}

// handleLoginSubmit(evt){
//   evt.preventDefault();
//
// var session_url = 'http://localhost:8080/social_reach/api/auth/token/obtain/';
// var uname = this.state.username;
// var pass = this.state.password;
// axios.post(session_url, {
//     'username': uname,
//     'password': pass
//   }).then(function(response) {
//     console.log(response);
//   console.log('Authenticated');
//   var token = response.data['access']
//   console.log(token);
//      axios.get('http://localhost:8080/social_reach/profiles/?format=json', { headers: { Authorization: `Bearer ${token}` } })
//      .then(res =>{
//      console.log(res);
// }).catch(function(error){
//   console.log("Error on authentication");
// })}).catch(function(error) {
//   console.log('Error on Authentication');
// });
//
// }


render(){

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
    <h3 className="tag-line"><i>A social app for social people</i></h3>
{/* TAG LINE END  */}


{/* LANDING IMAGE START */}
    <img className="landing-image" src="/images/app_images/girl.jpg" alt="girl-on-mobile-phone"></img>
{/* LANDING IMAGE END */}


  Password:
  <input type="text" name="password"   value={this.state.password}
          onChange={this.handlePasswordChange}></input>

  <input type="submit" value="Test login API"></input>
</form>



{/* LOGIN MODAL START */}
<div class="modal fade" data-backdrop="false" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
          <form onSubmit={this.props.handleLoginSubmit}>
              <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">Sign in</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body mx-3">

                  <div class="md-form mb-5">
                      <i class="fa fa-envelope prefix grey-text"></i>
                      <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange} id="defaultForm-username" class="form-control validate" placeholder="username"></input>
                      <label name="username" data-error="wrong" data-success="right" for="defaultForm-username"  ></label>
                  </div>

                  <div class="md-form mb-4">
                      <i class="fa fa-lock prefix grey-text"></i>
                      <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} id="defaultForm-pass" class="form-control validate" placeholder="password"></input>
                      <label data-error="wrong" data-success="right" for="defaultForm-pass"></label>
                  </div>

              </div>
              <div class="modal-footer d-flex justify-content-center">
                  <button  type='submit'  class="btn btn-default">Login</button>
              </div>
              </form>

          </div>
      </div>
  </div>

  <div class="text-center">
      <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalLoginForm">Login</a>
  </div>
{/* LOG IN MODAL END  */}



{/* REGISTER NEW USER  BUTTON START */}
<div className="text-center">
  <a href="/register" class="btn btn-default btn-rounded mb-4">New User?</a>
</div>
{/* REGISTER NEW USER BUTTON END */}


</div>
);
}
}

export default Landing;






//
//
// <button onclick={document.querySelector('modal').style.display='block'} style="width:auto;">Login</button>
//
// <div id="id01" class="modal">
//
// <form class="modal-content animate" action="/action_page.php">
//
// <div class="imgcontainer">
// <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
// </div>
//
// <div>
// <img src="img_avatar2.png" alt="Avatar" class="avatar"></img>
// </div>
//
// <div class="container">
//
//   <label for="uname"><b>Username</b></label>
//
//     <input type="text" placeholder="Enter Username" name="uname" required></input>
//     <label for="psw"><b>Password</b></label>
//     <input type="password" placeholder="Enter Password" name="psw" required></input>
//     <button type="submit">Login</button>
//
//     <label>
//       <input type="checkbox" checked="checked" name="remember"> Remember me</input>
//     </label>
//
// </div>
//
// <div class="container" style="background-color:#f1f1f1">
//   <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
//   <span class="psw">Forgot <a href="#">password?</a></span>
// </div>
//
// </form>
//
// </div>

// { <script>
// var modal = document.getElementById('id01')
// window.onclick = function(evt) {
//     evt.target == modal ? modal.style.display = "none" : null
//   }
// </script> }
