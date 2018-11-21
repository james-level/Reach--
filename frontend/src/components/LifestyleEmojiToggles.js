import React, { Component } from "react";

class LifestyleEmojiToggles extends Component {

  constructor(props) {
    super(props);

  }

  render(){

    return (

      <div>
      <div class="emoji-toggle emoji-diet">
        <input type="checkbox" checked={this.props.veganChecked} onChange={this.props.handleVeganCheckClick} id="toggle1" class="toggle"></input>
        <div class="emoji"></div>
        <label for="toggle1" class="well"></label>
      </div>

      <div class="emoji-toggle emoji-lifestyle">
        <input type="checkbox" checked={this.props.nonSmokingChecked} onChange={this.props.handleNonSmokingCheckClick} id="toggle2" class="toggle"></input>
        <div class="emoji"></div>
        <label for="toggle2" class="well"></label>
      </div>

      <div class="emoji-toggle emoji-passtime">
        <input type="checkbox" checked={this.props.prefersChillToGymChecked} onChange={this.props.handlePrefersChillToGymClicked} id="toggle3" class="toggle"></input>
        <div class="emoji"></div>
        <label for="toggle3" class="well"></label>
      </div>

      <div class="emoji-toggle emoji-rate">
        <input type="checkbox" checked={this.props.childlessChecked} onChange={this.props.handleChildlessCheckClick} id="toggle5" class="toggle"></input>
        <div class="emoji"></div>
        <label for="toggle5" class="well"></label>
      </div>
      </div>

    )

  }

}

export default LifestyleEmojiToggles;
