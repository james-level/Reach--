import React, { Component } from "react";

class LifestyleEmojiToggles extends Component {

  constructor(props) {
    super(props);

  }

  render(){

    return (

      <div>
      <div class="emoji-toggle emoji-diet">
        <input type="checkbox" checked={this.state.veganChecked} onChange={this.handleVeganCheckClick} id="toggle1" class="toggle"></input>
        <div class="emoji"></div>
        <label for="toggle1" class="well"></label>
      </div>

      <div class="emoji-toggle emoji-lifestyle">
        <input type="checkbox" checked={this.state.nonSmokingChecked} onChange={this.handleNonSmokingCheckClick} id="toggle2" class="toggle"></input>
        <div class="emoji"></div>
        <label for="toggle2" class="well"></label>
      </div>

      <div class="emoji-toggle emoji-passtime">
        <input type="checkbox" checked={this.state.prefersChillToGym} onChange={this.handlePrefersChillToGymClicked} id="toggle3" class="toggle"></input>
        <div class="emoji"></div>
        <label for="toggle3" class="well"></label>
      </div>

      <div class="emoji-toggle emoji-rate">
        <input type="checkbox" checked={this.state.childlessChecked} onChange={this.handleChildlessCheckClick} id="toggle5" class="toggle"></input>
        <div class="emoji"></div>
        <label for="toggle5" class="well"></label>
      </div>
      </div>

    )

  }

}

export default Gallery;
