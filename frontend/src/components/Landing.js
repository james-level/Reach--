import React from "react";
import ReactDOM from "react-dom";

// NB: Lines 5 & 6, I attempted to let this page access the log-in 'modal.js' files. Doesn't work :/
// import datatables from "/public/login_button_js/addons/datatables.js"
// import datatables from "/public/login_button_js/addons/datatables.min.js"


const Landing = () => (
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


{/* LOGIN MODAL START */}
<div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">Sign in</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mx-3">
                <div class="md-form mb-5">
                    <i class="fa fa-envelope prefix grey-text"></i>
                    <input type="email" id="defaultForm-email" class="form-control validate"></input>
                    <label data-error="wrong" data-success="right" for="defaultForm-email">Your email</label>
                </div>

                <div class="md-form mb-4">
                    <i class="fa fa-lock prefix grey-text"></i>
                    <input type="password" id="defaultForm-pass" class="form-control validate"></input>
                    <label data-error="wrong" data-success="right" for="defaultForm-pass">Your password</label>
                </div>

            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button class="btn btn-default">Login</button>
            </div>
        </div>
    </div>
</div>

<div class="text-center">
    <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalLoginForm">Log In</a>
</div>
{/* LOG IN MODAL END  */}

{/* NB / TODO: the <a> tag on line 66 has a href of "" - this *should* launch the modal log-in-form. Need to explore how this links to the form as currently it has no target (see <a> tag on line 75 as comparison. This redirects to registration page. */}


{/* REGISTER NEW USER  BUTTON START */}
<div className="text-center">
  <a href="/register" class="btn btn-default btn-rounded mb-4">New User?</a>
</div>
{/* REGISTER NEW USER BUTTON END */}


</div>
);

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
//
// {/* <script>
// var modal = document.getElementById('id01')
// window.onclick = function(evt) {
//     evt.target == modal ? modal.style.display = "none" : null
//   }
// </script> */}
