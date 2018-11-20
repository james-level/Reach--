import React from "react";
import Profile from './Profile';

const ReachPercentagesTable = () => (

  <div className="reach-stats">
  <div className="reach_table">
  <ul class="os-percentages horizontal-list">
      <li>
        {/* <p class="youtube os scnd-font-color">Youtube</p> */}
        <p class="youtube os scnd-font-color"><img src="../images/app_images/youtube-icon.png" height="30" width="30"></img></p>
        <p class="os-percentage">{Math.floor((100/this.props.total_reach()) * this.props.youtube_followers())}<sup>%</sup></p>
      </li>
      <li>
        <p class="twitter os scnd-font-color"><img src="../images/app_images/twitter-icon.png" height="30" width="30"></img></p>
        <p class="os-percentage">{Math.floor((100/this.props.total_reach()) * this.props.twitter_followers())}<sup>%</sup></p>
      </li>
      <li>
        <p class="instagram os scnd-font-color"><img src="../images/app_images/instagram-icon.png" height="30" width="30"></img></p>
        <p class="os-percentage">{Math.floor((100/this.props.total_reach()) * this.props.instagram_followers())}<sup>%</sup></p>
      </li>
      <li>
        <p class="facebook os scnd-font-color"><img src="../images/app_images/facebook-icon.png" height="30" width="30"></img></p>
        <p class="os-percentage">0<sup>%</sup></p>
      </li>
      <li>
        <p class="snapchat os scnd-font-color"><img src="../images/app_images/snapchat-icon.png" height="30" width="30"></img></p>
        <p class="os-percentage">0<sup>%</sup></p>
      </li>
      <li>
        <p class="spotify os scnd-font-color"><img src="../images/app_images/spotify-icon.png" height="30" width="30"></img></p>
        <p class="os-percentage">0<sup>%</sup></p>
      </li>
  </ul>
  </div>

  </div>


);

export default ReachPercentagesTable;
