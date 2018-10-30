import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import { Redirect } from 'react-router-dom'


class UserSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editClicked: false,
      settingsClicked: false,
      viewClicked: false
    }

    this.onEditClick = this.onEditClick.bind(this);

  }

total_reach(instagram_followers, twitter_followers, youtube_followers){return instagram_followers + twitter_followers + youtube_followers}

onEditClick(){

  this.setState({
    editClicked: true
  })

}

render(){

  if (this.state.editClicked === true){
   return <Redirect to='/publicprofile' data={this.props.data} loggedInAs={this.state.username} login= {true}/>
 }

else{
  return (

    <div className="user_card">

    <figure class="snip1344">
  <img src="{this.props.data.picture}" alt="profile-sample1" class="profile"></img>
  <figcaption>
    <h3>{this.props.loggedInAs}<span>Reach: {this.total_reach(this.props.data.instagram_followers, this.props.data.twitter_followers, this.props.data.youtube_followers)}</span><span>{this.props.data.location}</span></h3>
    <div class="icons">
    <div><input type='image' src="/images/app_images/editicon.svg" width="40" height="40" onClick={this.onEditClick}></input></div>
      <div><img src="/images/app_images/viewicon.svg" width="40" height="40"></img></div>
    <div><img src="/images/app_images/settingicon.svg" width="40" height="40"></img></div>
    </div>
  </figcaption>
</figure>

    </div>
  )
}


}

}

export default UserSection;
