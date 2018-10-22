import React, { Component } from "react";
import $ from 'jquery';
import jQuery from 'jquery'
import {geolocated, geoPropTypes} from 'react-geolocated';




class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: this.props.login,
      data: {},
      chart: false
    };
  }

twitter_followers(){
  return this.props.data.twitter_followers;
}

instagram_followers(){
  return this.props.data.instagram_followers;
}

youtube_followers(){
  return this.props.data.youtube_followers;
}

// REACH DONUT DISPLAY GRAPHIC START
chart(instagram_reach, twitter_reach, youtube_reach){

  this.setState({
    chart: true
  })

  console.log();

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>


  $(function(){
    $("#doughnutChart").drawDoughnutChart([
      { title: "Instagram",         value : instagram_reach,  color: "blue" },

      { title: "Twitter",      value:  twitter_reach,   color: "indigo" },
      { title: "Youtube",        value : youtube_reach,   color: "red" }

    ]);
  });
  /*!
   * jquery.drawDoughnutChart.js
   * Version: 0.4.1(Beta)
   * Inspired by Chart.js(http://www.chartjs.org/)
   *
   * Copyright 2014 hiro
   * https://github.com/githiro/drawDoughnutChart
   * Released under the MIT license.
   *
   */
  ;(function($, undefined) {
    $.fn.drawDoughnutChart = function(data, options) {
      var $this = this,
        W = $this.width(),
        H = $this.height(),
        centerX = W/2,
        centerY = H/2,
        cos = Math.cos,
        sin = Math.sin,
        PI = Math.PI,
        settings = $.extend({
          segmentShowStroke : true,
          segmentStrokeColor : "#0C1013",
          segmentStrokeWidth : 1,
          baseColor: "rgba(0,0,0,0.5)",
          baseOffset: 4,
          edgeOffset : 10,//offset from edge of $this
          percentageInnerCutout : 75,
          animation : true,
          animationSteps : 90,
          animationEasing : "easeInOutExpo",
          animateRotate : true,
          tipOffsetX: -8,
          tipOffsetY: -45,
          tipClass: "doughnutTip",
          summaryClass: "doughnutSummary",
          summaryTitle: "YOUR REACH",
          summaryTitleClass: "doughnutSummaryTitle",
          summaryNumberClass: "doughnutSummaryNumber",
          beforeDraw: function() {  },
          afterDrawed : function() {  },
          onPathEnter : function(e,data) {  },
          onPathLeave : function(e,data) {  }
        }, options),
        animationOptions = {
          linear : function (t) {
            return t;
          },
          easeInOutExpo: function (t) {
            var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
            return (v>1) ? 1 : v;
          }
        },
        requestAnimFrame = function() {
          return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
              window.setTimeout(callback, 1000 / 60);
            };
        }();

      settings.beforeDraw.call($this);

      var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),
          $paths = [],
          easingFunction = animationOptions[settings.animationEasing],
          doughnutRadius = Min([H / 2,W / 2]) - settings.edgeOffset,
          cutoutRadius = doughnutRadius * (settings.percentageInnerCutout / 100),
          segmentTotal = 0;

      //Draw base doughnut
      var baseDoughnutRadius = doughnutRadius + settings.baseOffset,
          baseCutoutRadius = cutoutRadius - settings.baseOffset;
      $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
        .attr({
          "d": getHollowCirclePath(baseDoughnutRadius, baseCutoutRadius),
          "fill": settings.baseColor
        })
        .appendTo($svg);

      //Set up pie segments wrapper
      var $pathGroup = $(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
      $pathGroup.attr({opacity: 0}).appendTo($svg);

      //Set up tooltip
      var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
          tipW = $tip.width(),
          tipH = $tip.height();

      //Set up center text area
      var summarySize = (cutoutRadius - (doughnutRadius - cutoutRadius)) * 2,
          $summary = $('<div class="' + settings.summaryClass + '" />')
                     .appendTo($this)
                     .css({
                       width: summarySize + "px",
                       height: summarySize + "px",
                       "margin-left": -(summarySize / 2) + "px",
                       "margin-top": -(summarySize / 2) + "px"
                     });
      var $summaryTitle = $('<p class="' + settings.summaryTitleClass + '">' + settings.summaryTitle + '</p>').appendTo($summary);
      var $summaryNumber = $('<p class="' + settings.summaryNumberClass + '"></p>').appendTo($summary).css({opacity: 0});

      for (var i = 0, len = data.length; i < len; i++) {
        segmentTotal += data[i].value;
        $paths[i] = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
          .attr({
            "stroke-width": settings.segmentStrokeWidth,
            "stroke": settings.segmentStrokeColor,
            "fill": data[i].color,
            "data-order": i
          })
          .appendTo($pathGroup)
          .on("mouseenter", pathMouseEnter)
          .on("mouseleave", pathMouseLeave)
          .on("mousemove", pathMouseMove);
      }

      //Animation start
      animationLoop(drawPieSegments);

      //Functions
      function getHollowCirclePath(doughnutRadius, cutoutRadius) {
          //Calculate values for the path.
          //We needn't calculate startRadius, segmentAngle and endRadius, because base doughnut doesn't animate.
          var startRadius = -1.570,// -Math.PI/2
              segmentAngle = 6.2831,// 1 * ((99.9999/100) * (PI*2)),
              endRadius = 4.7131,// startRadius + segmentAngle
              startX = centerX + cos(startRadius) * doughnutRadius,
              startY = centerY + sin(startRadius) * doughnutRadius,
              endX2 = centerX + cos(startRadius) * cutoutRadius,
              endY2 = centerY + sin(startRadius) * cutoutRadius,
              endX = centerX + cos(endRadius) * doughnutRadius,
              endY = centerY + sin(endRadius) * doughnutRadius,
              startX2 = centerX + cos(endRadius) * cutoutRadius,
              startY2 = centerY + sin(endRadius) * cutoutRadius;
          var cmd = [
            'M', startX, startY,
            'A', doughnutRadius, doughnutRadius, 0, 1, 1, endX, endY,//Draw outer circle
            'Z',//Close path
            'M', startX2, startY2,//Move pointer
            'A', cutoutRadius, cutoutRadius, 0, 1, 0, endX2, endY2,//Draw inner circle
            'Z'
          ];
          cmd = cmd.join(' ');
          return cmd;
      };
      function pathMouseEnter(e) {
        var order = $(this).data().order;
        $tip.text(data[order].title + ": " + data[order].value)
            .fadeIn(200);
        settings.onPathEnter.apply($(this),[e,data]);
      }
      function pathMouseLeave(e) {
        $tip.hide();
        settings.onPathLeave.apply($(this),[e,data]);
      }
      function pathMouseMove(e) {
        $tip.css({
          top: e.pageY + settings.tipOffsetY,
          left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
        });
      }
      function drawPieSegments (animationDecimal) {
        var startRadius = -PI / 2,//-90 degree
            rotateAnimation = 1;
        if (settings.animation && settings.animateRotate) rotateAnimation = animationDecimal;//count up between0~1

        drawDoughnutText(animationDecimal, segmentTotal);

        $pathGroup.attr("opacity", animationDecimal);

        //If data have only one value, we draw hollow circle(#1).
        if (data.length === 1 && (4.7122 < (rotateAnimation * ((data[0].value / segmentTotal) * (PI * 2)) + startRadius))) {
          $paths[0].attr("d", getHollowCirclePath(doughnutRadius, cutoutRadius));
          return;
        }
        for (var i = 0, len = data.length; i < len; i++) {
          var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (PI * 2)),
              endRadius = startRadius + segmentAngle,
              largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
              startX = centerX + cos(startRadius) * doughnutRadius,
              startY = centerY + sin(startRadius) * doughnutRadius,
              endX2 = centerX + cos(startRadius) * cutoutRadius,
              endY2 = centerY + sin(startRadius) * cutoutRadius,
              endX = centerX + cos(endRadius) * doughnutRadius,
              endY = centerY + sin(endRadius) * doughnutRadius,
              startX2 = centerX + cos(endRadius) * cutoutRadius,
              startY2 = centerY + sin(endRadius) * cutoutRadius;
          var cmd = [
            'M', startX, startY,//Move pointer
            'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
            'L', startX2, startY2,//Draw line path(this line connects outer and innner arc paths)
            'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
            'Z'//Cloth path
          ];
          $paths[i].attr("d", cmd.join(' '));
          startRadius += segmentAngle;
        }
      }
      function drawDoughnutText(animationDecimal, segmentTotal) {
        $summaryNumber
          .css({opacity: animationDecimal})
          .text((segmentTotal * animationDecimal).toFixed(1));
      }
      function animateFrame(cnt, drawData) {
        var easeAdjustedAnimationPercent =(settings.animation)? CapValue(easingFunction(cnt), null, 0) : 1;
        drawData(easeAdjustedAnimationPercent);
      }
      function animationLoop(drawData) {
        var animFrameAmount = (settings.animation)? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
            cnt =(settings.animation)? 0 : 1;
        requestAnimFrame(function innerFunc() {
            cnt += animFrameAmount;
            animateFrame(cnt, drawData);
            if (cnt <= 1) {
              requestAnimFrame(innerFunc);
            } else {
              settings.afterDrawed.call($this);
            }
        });
      }

      function Max(arr) {
        return Math.max.apply(null, arr);
      }
      function Min(arr) {
        return Math.min.apply(null, arr);
      }
      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function CapValue(valueToCap, maxValue, minValue) {
        if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
        if (isNumber(minValue) && valueToCap < minValue) return minValue;
        return valueToCap;
      }
      return $this;
    };
  })(jQuery);
}
// REACH DONUT DISPLAY GRAPHIC END

  total_reach(){
    return this.props.data.instagram_followers + this.props.data.twitter_followers + this.props.data.youtube_followers
  }


  render(){

    // const imageStyle = {backgroundImage: `url(${this.props.data.picture})`}
    const imageStyle2 = {backgroundSize: "cover", backgroundImage: `url(${this.props.data.picture_two})`}
    const imageStyle3 = {backgroundImage: `url(${this.props.data.picture_three})`}
    const imageStyle4 = {backgroundImage: `url(${this.props.data.picture_four})`}
    const imageStyle5 = {backgroundImage: `url(${this.props.data.picture_five})`}
    const imageStyle6 = {backgroundImage: `url(${this.props.data.picture_six})`}


    var getAge = require('get-age');
    var age = getAge(this.props.data.date_of_birth);
    console.log("age:",age);
    console.log(this.props);
      if (this.state.chart == false){
      this.chart(this.props.data.instagram_followers, this.props.data.twitter_followers, this.props.data.youtube_followers)
    }


//ternary to either display profile or log in message
  const post = this.props.loggedInAs  ? (

      <div className="profile">

        {/* <fieldset>
          <legend><span class="number"></span> </legend>
            <div class="gallery" data-flickity='{ "cellAlign": "left", "contain": true }'>
              <img src={`http://localhost:8080/social_reach/media/${this.props.data.picture}`}/>
              <img src={this.props.data.picture_two}/>
              <img src={this.props.data.picture_three}/>
              <img src={this.props.data.picture_four}/>
              <img src={this.props.data.picture_five}/>
              <img src={this.props.data.picture_six}/>
            </div>
        </fieldset>
        <br></br> */}


        <fieldset>
          <div class="slider-container">
            <div class="menu">
              {/* <label for="slide-dot-1"></label> */}
              <label for="slide-dot-2"></label>
              <label for="slide-dot-3"></label>
              <label for="slide-dot-4"></label>
              <label for="slide-dot-5"></label>
              <label for="slide-dot-6"></label>
            </div>

            {/* <input id="slide-dot-1" type="radio" name="slides" checked></input>
            <div class="slide slide-1" style={imageStyle}></div> */}

            <input id="slide-dot-2" type="radio" name="slides"></input>
            <div class="slide slide-2" style={imageStyle2}></div>

            <input id="slide-dot-3" type="radio" name="slides"></input>
            <div class="slide slide-3" style={imageStyle3}></div>

            <input id="slide-dot-4" type="radio" name="slides"></input>
            <div class="slide slide-4" style={imageStyle4}></div>

            <input id="slide-dot-5" type="radio" name="slides"></input>
            <div class="slide slide-5" style={imageStyle5}></div>

            <input id="slide-dot-6" type="radio" name="slides"></input>
            <div class="slide slide-6" style={imageStyle6}></div>
          </div>
        </fieldset>
        <br></br>


        <fieldset>
          <legend><span class="number"></span> {this.props.loggedInAs}, {age} </legend>
          <label type="text">{this.props.data.bio}</label>
        </fieldset>

{/* PIE CHART START  */}
        <fieldset>
          <div class="donut-chart-block block">

          <div class="donut-chart">
            <div id="porcion1" class="recorte"><div class="quesito twitter" data-rel={(100/this.total_reach()) * this.twitter_followers()}></div></div>
            <div id="porcion2" class="recorte"><div class="quesito instagram" data-rel={(100/this.total_reach()) * this.instagram_followers()}></div></div>
            <div id="porcion3" class="recorte"><div class="quesito youtube" data-rel={(100/this.total_reach()) * this.youtube_followers()}></div></div>
            <div id="porcionFin" class="recorte"><div class="quesito facebook" data-rel="0"></div></div>
            <p class="center-date">{this.total_reach()}<br></br><span class="scnd-font-color"></span></p>
          </div>

            <ul class="os-percentages horizontal-list">
                <li>
                  <p class="twitter os scnd-font-color">Twitter</p>
                  <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.twitter_followers())}<sup>%</sup></p>
                </li>
                <li>
                  <p class="instagram os scnd-font-color">Instagram</p>
                  <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.instagram_followers())}<sup>%</sup></p>
                </li>
                <li>
                  <p class="youtube os scnd-font-color">YouTube</p>
                  <p class="os-percentage">{Math.floor((100/this.total_reach()) * this.youtube_followers())}<sup>%</sup></p>
                </li>
                <li>
                  <p class="facebook os scnd-font-color">Facebook</p>
                  <p class="os-percentage">0<sup>%</sup></p>
                </li>
            </ul>
          </div>
        </fieldset>
{/* PIE CHART END  */}

      </div>

  ) : (
    <div className="center"> Oops! You need to log in :) </div>
  )

  return(
    <div className="container">
    {post}
    </div>

    )
  }
}







export default geolocated()(Profile);
