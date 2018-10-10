import React, { Component } from "react";



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
      data: {}
    };

  }



  render(){
    console.log(this.props);
    return(


  <div className="profile">

  <img className="landing-image" src="/images/app_images/user-profile-icon.png" alt="user-profile-icon"></img>

  <h2> {this.props.data.username}, 21 Yrs</h2>

  <h4> Hi, I....Like big butts and I can not lie You
        Other brothers can't deny That
        When a girl walks in with an itty bitty waist And
        A round thing in your face You
        Get sprung Wanna
        Pull up tough Cuz
        You notice that butt was stuffed Deep
        In the jeans she's wearing I'm
        Hooked and I can't stop staring Oh
        Baby, I wanna get with ya And
        Take your picture My
        Homeboys tried to warn me But
        That butt you got Make
        Me so horney Ooh
        Rump, of smooth skin You
        Say you wanna get in my benz Well
        Use me use me cuz you aint that average groupy I've
        Seen them dancin' To
        Hell with romancin' She's
        Sweat Wet, got, it goin like a turbo vette I'm
        Tired of magazines Saying
        Flat butts are the thing Take
        The average black man and ask him that She
        Gotta pack much back</h4>

  </div>
);
}
}

export default Profile;
