import React, { Component } from "react";


class StackedBar extends Component {
  constructor(props) {
    super(props);

  }




  render(){
    const youtubeReachPercent= (100/this.props.totalReach) * this.props.youtube;
    const twitterReachPercent= (100/this.props.totalReach) * this.props.twitter;
    const instagramReachPercent= (100/this.props.totalReach) * this.props.instagram;

    let styleYouTube = {
      width: `${youtubeReachPercent}%`
      
    }

    let styleTwitter = {
      width: `${twitterReachPercent}%`
    }

    let styleInstagram = {
      width: `${instagramReachPercent}%`
    }

    return(
      <div class="stacked-bar-graph" >
    <span id="stackedBarSpan" style={styleYouTube} class="bar-1"></span>
    <span id="stackedBarSpan" style={styleTwitter} class="bar-2"></span>
    <span id="stackedBarSpan" style={styleInstagram} class="bar-3"></span>
  </div>

    )
  }
}


export default StackedBar;
