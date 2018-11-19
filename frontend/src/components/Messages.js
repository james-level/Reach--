import React, { Component } from "react";


class Messages extends Component {
  constructor(props) {
    super(props);

    };

      render() {

        if (!this.props.loggedInAs){
          return (
            <div className="center"> Oops! You need to log in </div>
          )
        }

        else{
        return(

          <div>
            <img class="chat_placeholder" src="./images/app_images/chat.jpg"/>
          </div>

  )}}}


export default Messages;
