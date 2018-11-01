import React, { Component } from "react";
// import Flickity from 'flickity';


class PublicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
      data: {}
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render(){

    const imageStyle = {backgroundSize: "cover", backgroundImage: `url(${this.props.data.picture_six})`}
    const imageStyle2 = {backgroundImage: `url(${this.props.data.picture_two})`}
    const imageStyle3 = {backgroundImage: `url(${this.props.data.picture_three})`}
    const imageStyle4 = {backgroundImage: `url(${this.props.data.picture_four})`}
    const imageStyle5 = {backgroundImage: `url(${this.props.data.picture_five})`}
    const imageStyle6 = {backgroundImage: `url(${this.props.data.picture})`}
    console.log(this.props);
      const post = this.props.loggedInAs  ? (

                    <div class="public-profile">

                      <form onSubmit={this.handleSubmit}>

                      {/* Profile Info */}
                      <fieldset>
                        <legend><span class="number"></span> {this.props.data.name} </legend>
                        <label type="date">DoB: {this.props.data.date_of_birth}</label>
                        <label type="text">Gender: {this.props.data.gender_identity}</label>
                        <label type="text">Hometown: {this.props.data.location}</label>
                        <label type="text">Looking for: {this.props.data.looking_for}</label>
                      </fieldset>

                      <fieldset>
                        <legend><span class="number"></span> About </legend>
                        <label type="text">{this.props.data.bio}</label>
                      </fieldset>

                      <fieldset>
                        <legend><span class="number"></span> Interests </legend>
                        <label className="interests" type="text"> ⚽️ 🐶 🥩 </label>
                      </fieldset>

                      {/* Photo Carousel */}
                      <fieldset>
                        <legend><span class="number"></span> Selfie Centre </legend>
                        <div class="slider-container">

                          <div class="slider-menu">
                          <label for="slide-dot-1"></label>
                            <label for="slide-dot-2"></label>
                            <label for="slide-dot-3"></label>
                            <label for="slide-dot-4"></label>
                            <label for="slide-dot-5"></label>
                            <label for="slide-dot-6"></label>
                          </div>

                          <input id="slide-dot-1" type="radio" name="slides" ></input>
                          <div class="slide slide-1" style={imageStyle}></div>

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

                          </form>
                    </div>

                  ) : (
                    <div className="center"> Oops! You need to log in :/ </div>
                  )

                  return(
                    <div className="container">
                    {post}
                    </div>

                    )
                  }
                  }


export default PublicProfile;
