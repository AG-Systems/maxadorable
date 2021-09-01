import React from 'react';
import $ from "jquery";
import {
  Link,
} from "react-router-dom";
import Cookies from 'universal-cookie';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import { connect } from 'react-redux';
import { changeDarkMode } from '../state/actions.js';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import ExpandCollapse from 'react-expand-collapse';
import FadeIn from 'react-fade-in';


const bg_images = [
  {
    img: require('../images/bg/wp2022155.jpg'),
    style: "0% 0%"
  },
  {
    img: require('../images/bg/shutterstock_674781376.0.jpg'),
    style: "0% 0%"
  },
  {
    img: require('../images/bg/wp2022155.jpg'),
    style: "0% 0%"
  },
  {
    img: require('../images/bg/photo-1533683083439-1a776a5653cb.jpg'),
    style: "0% 0%"
  },
  {
    img: require('../images/bg/25048.jpg'),
    style: "0% 0%"
  },
  {
    img: require('../images/bg/shutterstock_674781376.0.jpg'),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/photo-1507041957456-9c397ce39c97.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/eb018d403fa9633f426fded17f843b73.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/bg_red.png"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/58341.jpg"),
    style: "0% 0%"
  },
  {
    img: require('../images/bg/wp2022155.jpg'),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/photo_2020-03-27_10-59-58.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/lion.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/bear_valley.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/beach1.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/Beach_Summer_Surfboard_Van_HD_Images.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/porsche-s-99x-electr-7_800x0w.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/118742116_4557493337626482_8978584120187536013_n.jpg"),
    style: "50% 50%"
  },
  {
    img: require("../images/bg/104485430_193939698613728_3350212393907244418_n.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/thumb-1920-363310.jpg"),
    style: "0% 0%"
  },
  {
    img: require("../images/bg/thumb-1920-458532.jpg"),
    style: "40% 40%"
  },


];

class Navbar extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = { value: 0, is_hovering: false, bio_expand: false };
    this.onChange = this.onChange.bind(this);
    this.changeHover = this.changeHover.bind(this);
    this.changeBio = this.changeBio.bind(this);

    const cookies = new Cookies();
    if(!cookies.get('background_img_url'))
    {
      const bg = bg_images[Math.floor(Math.random() * Math.floor(bg_images.length))];
      cookies.set('background_img_url', bg["img"]);
      cookies.set('background_img_style', bg["style"]);
    }



    this.refreshImage = this.refreshImage.bind(this);
    this.changeDarkMode = this.changeDarkMode.bind(this);

    let path = localStorage.getItem('path');
    if(path) {
      localStorage.removeItem('path');
      this.props.history.push([path]);
    }


    if(this.props.dark_mode_props)
    {
      if(this.props.dark_mode_props.dark_mode)
      {
        this.changeDarkMode(this.props.dark_mode_props.dark_mode, true);
        this.state = {
          "background_img_url": cookies.get('background_img_url'),
          "background_img_style": cookies.get('background_img_style'),
          "dark_mode": this.props.dark_mode_props.dark_mode
        };
      } else {
        this.changeDarkMode(false, true);
        this.state = {
          "background_img_url": cookies.get('background_img_url'),
          "background_img_style": cookies.get('background_img_style'),
          "dark_mode": false
        };
      }
    }

  }

  onChange(value) {
    this.setState({ value, is_hovering: false });
  }

  changeHover(value)
  {
    this.setState({ is_hovering: value });
  }

  changeBio(value=null)
  {
    if(value !== null)
    {
      this.setState({ bio_expand: value });
    } else {
      this.setState({ bio_expand: !this.state.bio_expand });
    }

  }

  refreshImage()
  {

      const cookies = new Cookies();
      const bg = bg_images[Math.floor(Math.random() * Math.floor(bg_images.length))];
      cookies.set('background_img_url', bg["img"]);
      cookies.set('background_img_style', bg["style"]);
      this.setState({
        "background_img_url": cookies.get('background_img_url'),
        "background_img_style": cookies.get('background_img_style')
      });
      window.location.reload();

  }


  changeDarkMode(dk, mounting=false)
  {
      if(dk)
      {

          $("body").removeClass('white-body');
          $("body").addClass('dark-body');
          $("#navbar-card").removeClass("white-card");
          $("#navbar-card").addClass("dark-card border-0");

          // navbar tabs and cards
          $("#card-content").addClass("dark-card");
          $("#card-content").addClass("bg-white");
          $(".card-date").css("color","rgba(226, 226, 226, 0.6)");
          $(".card-location").css("color", "rgba(245, 245, 245, 0.6)");

          $(".navbar-cards").addClass("bg-dark text-white");
          $(".list-group-item").addClass("bg-dark text-white");
          if(!mounting)
          {
            this.setState({
                "dark_mode": true
            });
          }

      } else {


        $("body").removeClass('dark-body');
        $("body").addClass('white-body');
        $("#navbar-card").removeClass("dark-card border-0");
        $("#navbar-card").addClass("white-card");

        // navbar tabs and cards
        $(".btn-navbar").addClass("white-text");
        $(".btn-navbar").removeClass("dark-text");
        $("#card-content").addClass("bg-white");
        $("#card-content").removeClass("dark-card");
        $(".card-date").css("color","rgba(0, 0, 0, 0.6)");
        $(".card-location").css("color", "rgba(0, 0, 0, 0.6)");

        $(".navbar-cards").removeClass("bg-dark text-white");
        $(".list-group-item").removeClass("bg-dark text-white");
        if(!mounting)
        {
          this.setState({
              "dark_mode": false
          });
        }
      }
  }

  componentDidUpdate(prevProps)
  {
    if (this.props.dark_mode_props.dark_mode !== prevProps.dark_mode_props.dark_mode) {
        this.changeDarkMode(this.props.dark_mode_props.dark_mode);
    }
  }

  handleClick = () => {
    this.props.changeDarkMode(this.state["dark_mode"]);
  }

  componentDidMount()
  {
    if(this.props.dark_mode_props)
    {
      if(this.props.dark_mode_props.dark_mode)
      {
        $(".navbar-cards").addClass("bg-dark text-white");
        $(".list-group-item").addClass("bg-dark text-white");
      } else {
        $(".navbar-cards").removeClass("bg-dark text-white");
        $(".list-group-item").removeClass("bg-dark text-white");
      }
    }
  }


  render() {
    // console.log(this.state);
    let background_img;
    if(window.screen.width >= 1670)
    {
      background_img = "url(" + this.state["background_img_url"] + ")" + this.state["background_img_style"];
    } else {
      background_img = "url(" + this.state["background_img_url"] + ")";
    }


    return (
      <div id="navbar" hidden={ this.props.match.url === "/about" }>
        <div style={{width: '100%', height: (window.screen.width > 991 ? "10px" : "0px")}}></div>
        <div className="card" style={{width: (window.screen.width > 991 ? "45%" : "100%"), minWidth: "320px", margin: "0 auto"}} id="navbar-card">
          <i className="fas fa-redo" alt="Click on icon to refresh background image" style={{ zIndex: 5, position: "absolute", right: 0, padding: "10px", textShadow: "0 0 3px #000", color: "white" }} onClick={ this.refreshImage }></i>
          <div className="card-img-top" style={{ background: background_img, height: "200px", backgroundSize: "cover" }} id="background_img"></div>
          <div className="card-body">
            <img alt='' className='card-img-profile' src={ require("../images/profile/Wall-ESoundtrack.jpg") } style={{ height: "120px", width: "120px" }} />
            <h3 className="card-text" style={{ fontFamily: "Titillium Web", color: this.state["dark_mode"] ? "#f8f9fa" : "#1c1e20"}} >Max Chakhmatov</h3>
            <a target="_blank" href={process.env.PUBLIC_URL + '/Max_Chakhmatov_resume.pdf'} className="btn btn-mycolor"> Resume </a>
            <br/>
            <br/>
              <span className="dark-mode">
                In short: I'm a passionate learner who is a engineer (software, mechanical, & hardware) who likes surfing🌊, and robotics🦾. <br/>
              </span>
              <p style={{ color: "#1fd19b" }}
              onMouseEnter={() => this.changeBio(true)}
              onMouseLeave={() => this.changeBio(false)}
              className="d-lg-none"
              > { this.state.bio_expand ? "Expanded..." : "Read more" } </p>

              <p style={{ color: "#1fd19b" }}
              onMouseEnter={() => this.changeBio(true)}
              onClick={() => this.changeBio(false)}
              className="d-none d-lg-block"
              > { this.state.bio_expand ? "Expanded..." : "Read more" } </p>

              {this.state.bio_expand &&
                  <FadeIn>
                    <p>
                    Born and raised in California, I am currently studying robotics engineering at University of California, Santa Cruz. I might be a college student right now, but I have always been a student in life and planning to continue learning.
                    I love learning everything and anything.
                    </p>
                    {/*
                    <h2>Values</h2>
                    <br/>
                    <div className="card-deck">
                      <div className="card border-0" style={{ maxWidth: '250px'}}>
                        <img src={require("../images/bg/lucid.jpg")} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h4 className="card-title text-center">Innovation</h4>
                        </div>
                      </div>
                      <div className="card border-0" style={{ maxWidth: '250px'}}>
                        <img src={require("../images/bg/lucid.jpg")} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h4 className="card-title text-center">Innovation</h4>
                        </div>
                      </div>
                      <div className="card border-0" style={{ maxWidth: '250px'}}>
                        <img src={require("../images/bg/lucid.jpg")} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h4 className="card-title text-center">Innovation</h4>
                        </div>
                      </div>
                    </div>
                    */}
                    {/*
                    <Carousel
                      value={this.state.value}
                      onChange={this.onChange}
                      // slidesPerPage={ ( window.screen.width > 1325 ? ( this.state.is_hovering ? 1 : 2) : ( window.screen.width > 900 ? ( this.state.is_hovering ? 1 : 2 ) : 1 ) )}
                      slidesPerPage={ 1 }
                      infinite
                      autoPlay={ 4000 }
                      animationSpeed={1000}
                    >
                      <div style={{ width: "100%" }}>
                      */}
                        <h2>Career interests</h2>
                        <p>Note: this list is not complete</p>
                        <br/>
                        <div className="card-deck">
                          <div className="card border-0 navbar-cards mb-3 bg-transparent" style={{ maxWidth: '250px', margin: "0 auto" }}>
                            <img src={require("../images/bg/gregor-kopka-arm6.jpg")} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "180px", width: "100%" }} />
                            <div className="card-body">
                              <h4 className="card-title text-center" style={{ fontSize: "1.3rem" }}>Robotics</h4>
                            </div>
                          </div>
                          <div className="card border-0 navbar-cards mb-3 bg-transparent" style={{ maxWidth: '250px', margin: "0 auto"}}>
                            <img src={require("../images/bg/sdc.png")} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "180px", width: "100%" }} />
                            <div className="card-body">
                              <h4 className="card-title text-center" style={{ fontSize: "1.3rem" }}>Self-driving vehicles</h4>
                            </div>
                          </div>
                          <div className="card border-0 navbar-cards mb-3 bg-transparent" style={{ maxWidth: '250px', margin: "0 auto"}}>
                            <img src={require("../images/bg/manufacturing.jpg")} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "180px", width: "100%" }} />
                            <div className="card-body">
                              <h4 className="card-title text-center" style={{ fontSize: "1.3rem" }}>Manufacturing</h4>
                            </div>
                          </div>
                        </div>
                        <div className="card-deck">
                          <div className="card border-0 navbar-cards mb-3 bg-transparent" style={{ maxWidth: '250px', margin: "0 auto"}}>
                            <img src={require("../images/bg/mining.jpg")} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "180px", width: "100%" }} />
                            <div className="card-body">
                              <h4 className="card-title text-center" style={{ fontSize: "1.3rem" }}>Mining</h4>
                            </div>
                          </div>
                          <div className="card border-0 navbar-cards mb-3 bg-transparent" style={{ maxWidth: '250px', margin: "0 auto"}}>
                            <img src={require("../images/bg/lucid.jpg")} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "180px", width: "100%" }} />
                            <div className="card-body">
                              <h4 className="card-title text-center" style={{ fontSize: "1.3rem" }}>Electric Vehicles</h4>
                            </div>
                          </div>
                          <div className="card border-0 navbar-cards mb-3 bg-transparent" style={{ maxWidth: '250px', margin: "0 auto"}}>
                            <img src={require("../images/bg/space2.jpg")} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "180px", width: "100%" }} />
                            <div className="card-body">
                              <h4 className="card-title text-center" style={{ fontSize: "1.3rem" }}>Space</h4>
                            </div>
                          </div>
                        </div>
                      {/*
                      </div>

                      <div style={{ width: "100%" }}>
                        <h2>Values</h2>
                        <br/>
                        <div className="card-deck">
                          <div className="card border-0" style={{ maxWidth: '250px', margin: "0 auto"}}>
                            <img src={require("../images/bg/mining.jpg")} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "180px", width: "100%" }} />
                            <div className="card-body">
                              <h4 className="card-title text-center" style={{ fontSize: "1.3rem" }}>Mining</h4>
                            </div>
                          </div>
                          <div className="card border-0" style={{ maxWidth: '250px', margin: "0 auto"}}>
                            <img src={require("../images/bg/lucid.jpg")} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "180px", width: "100%" }} />
                            <div className="card-body">
                              <h4 className="card-title text-center" style={{ fontSize: "1.3rem" }}>Electric Vehicles</h4>
                            </div>
                          </div>
                          <div className="card border-0" style={{ maxWidth: '250px', margin: "0 auto"}}>
                            <img src={require("../images/bg/space2.jpg")} className="card-img-top" alt="..." style={{ objectFit: "cover", height: "180px", width: "100%" }} />
                            <div className="card-body">
                              <h4 className="card-title text-center" style={{ fontSize: "1.3rem" }}>Space</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Carousel>
                    */}
                  </FadeIn>
              }
              <FadeIn delay={500}>
                <h2>Highlights</h2>
              </FadeIn>
              {/* <br/> */}
              <div className="d-none d-lg-block mb-5"></div>

              <Carousel
                value={this.state.value}
                onChange={this.onChange}
                slidesPerPage={ ( window.screen.width > 1500 ? 2 : ( window.screen.width > 1094 ? 1 : 1 ) )}
                infinite
                autoPlay={ 4000 }
                animationSpeed={1000}
              >

              <div className="card mr-3 ml-3 mb-5 border-0 navbar-cards" style={{maxWidth: '98%', height: ( window.screen.width > 1325 ? "340px" : ( window.screen.width > 900 ? "340px" : "510px" ) ), minheight: "300px", boxShadow: "0 0.6rem 1rem rgb(0 0 0 / 15%)" }}
              onMouseEnter={() => this.changeHover(true)}
              // onMouseLeave={() => this.changeHover(false)}
              >
                <div className="row no-gutters" style={{ height: "100%" }}>
                  <div className="col-md-4">
                    <img src={"https://www.hpsarch.com/sites/default/files/styles/lg_16_9/public/2019-10/UCSC2_0.jpg?itok=Qes1XJRX"} className="card-img" alt="..." style={{ objectFit: "cover", height: ( window.screen.width > 900 ? "100%" : "200px" ), width: "100%" }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h6 className="card-text" style={{ fontWeight: "600" }}>Student</h6>
                      <p className="card-text">Robotics Engineering <br/> University of California, Santa Cruz</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"> <img src={require("../images/logos/ucsc_engineering.png")} height={30} width={30} alt="..." /> UCSC </li>
                      <li className="list-group-item"> <img src={require("../images/logos/foothill.png")} height={30} width={30} alt="..." /> Foothill</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card mr-3 ml-3 mb-5 border-0 navbar-cards" style={{maxWidth: '98%', height: ( window.screen.width > 1325 ? "340px" : ( window.screen.width > 900 ? "340px" : "510px" ) ), minheight: "300px", boxShadow: "0 0.6rem 1rem rgb(0 0 0 / 15%)" }}
              onMouseEnter={() => this.changeHover(true)}
              //onMouseLeave={() => this.changeHover(false)}
              >
                <div className="row no-gutters" style={{ height: "100%" }}>
                  <div className="col-md-4">
                    <img src={require("../images/bg/8666949245_ce1e6918cd_b.jpg")} className="card-img" alt="..." style={{ objectFit: "cover", height: ( window.screen.width > 900 ? "100%" : "200px" ), width: "100%" }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h6 className="card-text" style={{ fontWeight: "600" }}>Software Engineering</h6>
                      <p className="card-text">Full stack and mobile app development</p>
                    </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"> <img src={require("../images/logos/walmart.jfif")} height={30} width={30} alt="..." /> Walmart </li>
                        <li className="list-group-item"> <img src={require("../images/logos/fireflies.jpg")} height={30} width={30} alt="..." /> Fireflies.ai </li>
                        <li className="list-group-item"> <img src={require("../images/logos/quesgen.png")} height={30} width={30} alt="..." /> QuesGen </li>
                      </ul>
                  </div>
                </div>
              </div>

              <div className="card mr-3 ml-3 mb-5 border-0 navbar-cards" style={{maxWidth: '98%', height: ( window.screen.width > 1325 ? "340px" : ( window.screen.width > 900 ? "340px" : "510px" ) ), minheight: "300px", boxShadow: "0 0.6rem 1rem rgb(0 0 0 / 15%)" }}
              onMouseEnter={() => this.changeHover(true)}
              //onMouseLeave={() => this.changeHover(false)}
              >
                <div className="row no-gutters" style={{ height: "100%" }}>
                  <div className="col-md-4">
                    <img src={require("../images/bg/gregor-kopka-arm6.jpg")} className="card-img" alt="..." style={{ objectFit: "cover", height: ( window.screen.width > 900 ? "100%" : "200px" ), width: "100%", backgroundPosition: "0% 0%" }} />
                  </div>
                  <div className="col-md-8" style={{ height: "100%"}}>
                    <div className="card-body">
                      <h6 className="card-text" style={{ fontWeight: "600" }}>Mechanical Engineering</h6>
                      <p className="card-text">Mechatronics, and reliability engineering</p>
                      <p className="card-text"></p>
                    </div>

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"> <img src={require("../images/logos/barrick.jfif")} height={30} width={30} alt="..." /> Barrick</li>
                      </ul>
                  </div>
                </div>
              </div>

              {/*
              <div className="card mr-3 ml-3 mb-5 border-0 navbar-cards" style={{maxWidth: '98%', height: ( window.screen.width > 1325 ? "340px" : ( window.screen.width > 900 ? "340px" : "510px" ) ), minheight: "300px", boxShadow: "0 0.6rem 1rem rgb(0 0 0 / 15%)" }}
              onMouseEnter={() => this.changeHover(true)}
              //onMouseLeave={() => this.changeHover(false)}
              >
                <div className="row no-gutters" style={{ height: "100%" }}>
                  <div className="col-md-4">
                    <img src={require("../images/bg/gregor-kopka-arm6.jpg")} className="card-img" alt="..." style={{ objectFit: "cover", height: ( window.screen.width > 900 ? "100%" : "200px" ), width: "100%", backgroundPosition: "0% 0%" }} />
                  </div>
                  <div className="col-md-8" style={{ height: "100%"}}>
                    <div className="card-body">
                      <h6 className="card-text" style={{ fontWeight: "600" }}>Electrical Engineering</h6>
                      <p className="card-text">Schematic design and PCB design.</p>
                      <p className="card-text"></p>
                    </div>

                      <ul className="list-group list-group-flush">

                      </ul>
                  </div>
                </div>
              </div>
              */}

              <div className="card mr-3 ml-3 mb-5 border-0 navbar-cards" style={{maxWidth: '98%', height: ( window.screen.width > 1325 ? "340px" : ( window.screen.width > 900 ? "340px" : "510px" ) ), minheight: "300px", boxShadow: "0 0.6rem 1rem rgb(0 0 0 / 15%)"}}
              onMouseEnter={() => this.changeHover(true)}
              //onMouseLeave={() => this.changeHover(false)}
              >
                <div className="row no-gutters" style={{ height: "100%" }}>
                  <div className="col-md-4">
                    <img src={require("../images/bg/space.jpg")} className="card-img" alt="..." style={{ objectFit: "cover", height: ( window.screen.width > 900 ? "100%" : "200px" ), width: "100%", backgroundPosition: "0% 0%" }} />
                  </div>
                  <div className="col-md-8" style={{ height: "100%"}}>
                    <div className="card-body">
                      <h6 className="card-text" style={{ fontWeight: "600" }}>Entrepreneurship</h6>
                      <p className="card-text">"The best way to predict the future is to create it"</p>
                    </div>

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"> <img src={require("../images/logos/chronoci.jpg")} height={30} width={30} alt="..." /> ChronoCI</li>
                      </ul>
                  </div>
                </div>
              </div>

              <div className="card mr-3 ml-3 mb-5 border-0 navbar-cards" style={{maxWidth: '98%', height: ( window.screen.width > 1325 ? "340px" : ( window.screen.width > 900 ? "340px" : "510px" ) ), minheight: "300px", boxShadow: "0 0.6rem 1rem rgb(0 0 0 / 15%)"}}
              onMouseEnter={() => this.changeHover(true)}
              //onMouseLeave={() => this.changeHover(false)}
              >
                <div className="row no-gutters" style={{ height: "100%" }}>
                  <div className="col-md-4">
                    <img src={require("../images/bg/surf2.jpg")} className="card-img" alt="..." style={{ objectFit: "cover", height: ( window.screen.width > 900 ? "100%" : "200px" ), width: "100%", backgroundPosition: "0% 0%" }} />
                  </div>
                  <div className="col-md-8" style={{ height: "100%"}}>
                    <div className="card-body">
                      <h6 className="card-text" style={{ fontWeight: "600" }}>Surfing</h6>
                      <p className="card-text">Fun hobby</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mr-3 ml-3 mb-5 border-0 navbar-cards" style={{maxWidth: '98%', height: ( window.screen.width > 1325 ? "340px" : ( window.screen.width > 900 ? "340px" : "510px" ) ), minheight: "300px", boxShadow: "0 0.6rem 1rem rgb(0 0 0 / 15%)"}}
              onMouseEnter={() => this.changeHover(true)}
              //onMouseLeave={() => this.changeHover(false)}
              >
                <div className="row no-gutters" style={{ height: "100%" }}>
                  <div className="col-md-4">
                    <img src={require("../images/bg/img_0728-sm_abovegranitelakes.jpg")} className="card-img" alt="..." style={{ objectFit: "cover", height: ( window.screen.width > 900 ? "100%" : "200px" ), width: "100%", backgroundPosition: "0% 0%" }} />
                  </div>
                  <div className="col-md-8" style={{ height: "100%"}}>
                    <div className="card-body">
                      <h6 className="card-text" style={{ fontWeight: "600" }}>Environment</h6>
                      <p className="card-text">Big advocate in protecting the enviroment</p>
                    </div>
                  </div>
                </div>
              </div>


              </Carousel>
              <span style={{ color: "#6e767d" }}>
                  <i className="fas fa-map-marker-alt"></i> Planet earth & hopefully one day, Mars
              </span>



            {/*
            <input type="checkbox" id="hide-checkbox" hidden={true} />
            <label htmlFor="hide-checkbox" className="toggle">
              <span className="toggle-button">
                <span className="crater crater-1" />
                <span className="crater crater-2" />
                <span className="crater crater-3" />
                <span className="crater crater-4" />
                <span className="crater crater-5" />
                <span className="crater crater-6" />
                <span className="crater crater-7" />
              </span>
              <span className="star star-1" />
              <span className="star star-2" />
              <span className="star star-3" />
              <span className="star star-4" />
              <span className="star star-5" />
              <span className="star star-6" />
              <span className="star star-7" />
              <span className="star star-8" />
            </label>
            */}
            <div style={{ color: "rgb(110, 118, 125)" }}>
              Dark mode:
              <br/>
              <Toggle
                defaultChecked={ this.state["dark_mode"] }
                icons={false}
                onChange={ this.handleClick } />
              <br/>
              {/* <span style={{ fontSize: "13px", color: "rgb(110, 118, 125)" }}>ps: dark mode is automatically enabled by time of day </span> */}
            </div>

            <div className="footer-copyright py-3">
              <a target="_blank" href="https://www.linkedin.com/in/max-chakhmatov/">
                <i className="fab fa-linkedin" style={{fontSize: '25px', color: "#1ebc8c"}} />
              </a>
              <a target="_blank" href="https://github.com/ag-systems">
                <i className="fab fa-github" style={{fontSize: '25px', paddingLeft: '15px', color: "#1ebc8c"}} />
              </a>
              <a target="_blank" href="https://angel.co/max-chakhmatov">
                <i className="fab fa-angellist" style={{fontSize: '25px', paddingLeft: '15px', color: "#1ebc8c"}} />
              </a>
              <a target="_blank" href="https://stackoverflow.com/users/5487345/auriga?tab=profile">
                <i className="fab fa-stack-overflow" style={{fontSize: '25px', paddingLeft: '15px', color: "#1ebc8c"}} />
              </a>
              <a target="_blank" href="https://twitter.com/maxchakhmatov">
                <i className="fab fa-twitter" style={{fontSize: '25px', color: "#1ebc8c" , paddingLeft: '15px' }} />
              </a>
            </div>
          </div>

          <div className="btn-group" style={{ width: "100%"}}>
            <Link to="/" className={this.props.match.url === "/" ? "btn border-bottom-active" : ( this.state["dark_mode"] ? "btn btn-navbar dark-text" : "btn btn-navbar white-text") }>
              <span className="d-lg-none" style={{ fontSize: "10px" }}>Experience</span>
              <span className="d-none d-lg-block">Experience</span>
            </Link>
            <Link to="/education" className={this.props.match.url === "/education" ? "btn border-bottom-active" : ( this.state["dark_mode"] ? "btn btn-navbar dark-text" : "btn btn-navbar white-text") }>
              <span className="d-lg-none" style={{ fontSize: "10px" }}>Education</span>
              <span className="d-none d-lg-block">Education</span>
            </Link>
            <Link to="/miscellaneous" className={this.props.match.url === "/miscellaneous" ? "btn border-bottom-active" : ( this.state["dark_mode"] ? "btn btn-navbar dark-text" : "btn btn-navbar white-text") }>
              <span className="d-lg-none" style={{ fontSize: "10px" }}>Miscellaneous</span>
              <span className="d-none d-lg-block">Miscellaneous</span>
            </Link>
            {/*
            <Link to="/skills" className={this.props.match.url === "/skills" ? "btn border-bottom-active" : ( this.state["dark_mode"] ? "btn btn-navbar dark-text" : "btn btn-navbar white-text") }>
              <span className="d-lg-none" style={{ fontSize: "10px" }}>Skills</span>
              <span className="d-none d-lg-block">Skills</span>
            </Link>
            */}
            {/*
            <Link to="/more" className={this.props.match.url === "/more" ? "btn border-bottom-active" : ( this.state["dark_mode"] ? "btn btn-navbar dark-text" : "btn btn-navbar white-text") }>
              <span className="d-lg-none" style={{ fontSize: "10px" }}>More</span>
              <span className="d-none d-lg-block">More</span>
            </Link>
            */}
          </div>

        </div>
      </div>
    );
  }
}

// export default Navbar;

const mapStateToProps = (state, ownProps) => {
    return {
        dark_mode_props: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDarkMode: (dk) => {
            dispatch(changeDarkMode(dk));
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
