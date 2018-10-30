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
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onViewClick = this.onViewClick.bind(this);

  }

total_reach(instagram_followers, twitter_followers, youtube_followers){return instagram_followers + twitter_followers + youtube_followers}

onEditClick(){

  this.setState({
    editClicked: true
  })
}

onSettingsClick(){

  this.setState({
    settingsClicked: true
  })

}

onViewClick(){

  this.setState({
    viewClicked: true
  })

}

render(){

  if (this.state.editClicked === true){
   return <Redirect to='/updatereach' data={this.props.data} loggedInAs={this.state.username} login= {true}/>
 }

 if (this.state.settingsClicked === true){
  return <Redirect to='/settings' data={this.props.data} loggedInAs={this.state.username} login= {true}/>
}

if (this.state.viewClicked === true){
 return <Redirect to='/profile' data={this.props.data} loggedInAs={this.state.username} login= {true}/>
}

else{
  return (

    <div className="user_card">



  <figure class="snip1344">
    <img src="./images/app_images/user3.jpeg" alt="profile-image" class="profile"></img>

    {/*TODO: Image on 'user' page should be of user, not logo. To be addressed.  */}
    {/* <img src="{this.props.data.picture}" alt="profile-image" class="profile"></img> */}

    <figcaption>

      <h3>{this.props.data.name}

        <span>Reach: {this.total_reach(this.props.data.instagram_followers, this.props.data.twitter_followers, this.props.data.youtube_followers)}</span>

         <span> Location: 🌏 {this.props.data.location}</span>

         <span> Likes: 👍🏻 {this.props.data.likes}</span>

         <span> Dislikes: 👎🏻 {this.props.data.greetings}</span>

       </h3>

      <div class="usericons">
        <ul>
          <li className="userbutton">
            <input type='image' src="/images/app_images/editicon.svg" width="40" height="40" onClick={this.onEditClick}></input>
          </li>
          <li className="userbutton">
            <input type='image' src="/images/app_images/viewicon.svg" width="40" height="40" onClick={this.onViewClick}></input>
          </li>
          <li className="userbutton">
            <input type='image' src="/images/app_images/settingicon.svg" width="40" height="40" onClick={this.onSettingsClick}></input>
          </li>
        </ul>
      </div>

    </figcaption>
  </figure>

    </div>
  )
}


}

}

export default UserSection;
