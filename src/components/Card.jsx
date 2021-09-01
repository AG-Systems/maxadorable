import React from 'react';
import FadeIn from 'react-fade-in';
import $ from "jquery";
import date from 'date-and-time';
import { Link } from "react-router-dom";
import ExpandCollapse from 'react-expand-collapse';
import { connect } from 'react-redux';

const  DATE_DIFF = require("date-diff-js");
const hash = require('object-hash');



class Card extends React.Component {
  constructor(props)
  {
    super(props);


  }

  componentDidMount()
  {
    if(this.props.dark_mode_props)
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


      }
  }


    render() {
      const props = this.props;
      const data_list = props.data;
      if(data_list && data_list.length !== 0)
      {
            let data_cards = data_list.map(function(exp, index)
            {
              let difference_months = "";
              if(exp.date_ended == "Present")
              {
                difference_months = DATE_DIFF(exp.date_started, (new Date(new Date().getFullYear(),new Date().getMonth())).toString(), 'Month').output + 1;
              } else {
                difference_months = DATE_DIFF(exp.date_started, exp.date_ended, "Month").output + 1;
              }

              let date_element = "";
              if(exp.date_ended == "Present" || ( exp.total_length === null || exp.total_length === "" || exp.total_length === undefined ))
              {
                if(difference_months >= 12)
                {
                  let years = 0;
                  let months = 0;
                  while(difference_months >= 12)
                  {
                    years += 1;
                    difference_months = difference_months - 12;
                  }
                  months = difference_months;
                  if(months > 0)
                  {
                    date_element = <span className="card-date" style={{ color: props.dark_mode_props ? "rgba(226, 226, 226, 0.6)" : "rgba(0, 0, 0, 0.6)" }} > { exp.date_started } - { exp.date_ended } • { years } { years > 1 ? "Years" : "Year" } { difference_months } { difference_months > 1 ? "Months" : "Month" } </span>;
                  } else {
                    date_element = <span className="card-date" style={{ color: props.dark_mode_props ? "rgba(226, 226, 226, 0.6)" : "rgba(0, 0, 0, 0.6)" }} > { exp.date_started } - { exp.date_ended } • { years } { years > 1 ? "Years" : "Year" } </span>;
                  }
                } else {
                  date_element = <span className="card-date" style={{ color: props.dark_mode_props ? "rgba(226, 226, 226, 0.6)" : "rgba(0, 0, 0, 0.6)" }} > { exp.date_started } - { exp.date_ended } • { difference_months } { difference_months > 1 ? "Months" : "Month" } </span>;
                }
              } else {
                date_element = <span className="card-date" style={{ color: props.dark_mode_props ? "rgba(226, 226, 226, 0.6)" : "rgba(0, 0, 0, 0.6)" }} > { exp.date_started } - { exp.date_ended } • { exp.total_length } </span>;
              }


              let description_content = [];
              // description_content.push(<br key={ hash("desktop-" + exp.date_started + index + Math.floor(Math.random() * Math.floor(1000))) } />);
              description_content.push(<div style={{ width: "100%", height: "6px" }}></div>);
              for (let value of data_list[index].description) {
                description_content.push(<span className="dark-mode-card-desc" key={ hash("desktop-" + exp.date_ended + index + Math.floor(Math.random() * Math.floor(1000)))}> { value } </span>);
                description_content.push(<br key={ hash("desktop-" + exp.date_ended + index + Math.floor(Math.random() * Math.floor(1000))) } />);
              }
              // description_content.push(<br key={ hash("desktop-" + exp.date_ended + index + Math.floor(Math.random() * Math.floor(1000))) } />);
              description_content.push(<div style={{ width: "100%", height: "15px" }}></div>);

              return (
               <>
               <div className="d-none d-lg-block">
                <div className={ exp.minimized ? "media mt-1" : "media mt-5" } key={ hash("desktop-" + exp.date_ended + index + Math.floor(Math.random() * Math.floor(1000))) + exp.index }>
                  <img src={ exp.img } className="mr-3 d-none d-lg-block" height="56" width="56" alt="..." />
                  <div className={ exp.hide_bottom_bar ? "media-body d-none d-lg-block" : "media-body border-bottom d-none d-lg-block"}>
                    <h3 className="mt-0" style={{ fontSize: "1.2rem" }}>{ exp.title }</h3>
                    <p style={{ fontFamily: "Titillium Web", marginBottom: "0px" }}>
                        <span className="card-sub" style={{ fontWeight: "400" }}>{ exp.sub_title }</span>
                        <br/>
                        <span hidden={exp.date_started === ""}> { date_element } </span>
                        <br/>
                        <span className="card-location" style={{ color: props.dark_mode_props ? "rgba(226, 226, 226, 0.6)" : "rgba(0, 0, 0, 0.6)" }}> { exp.location } </span>
                    </p>
                    <span>
                      { description_content }
                    </span>
                  </div>
                </div>
              </div>


                {/* MOBILE  */}
                <div className={ exp.minimized ? "media mt-1 d-lg-none" : "media d-lg-none" } style={( exp.minimized || index === 0 )? {} : {marginTop: "3.3rem"}} key={ hash("mobile-" + exp.date_ended + index + Math.floor(Math.random() * Math.floor(1000))) + exp.index }>
                  <img src={ exp.img } className="mr-3 d-lg-none" alt="..." height="45" width="45" />
                  <div className={ exp.hide_bottom_bar ? "media-body d-lg-none" : "media-body d-lg-none"}>
                    <h3 className="mt-0 mb-0 dark-mode-card-title" style={{ fontSize: "15px", fontWeight: "600" }}>{ exp.title }</h3>
                    <p style={{ fontFamily: "Titillium Web", lineHeight: 1 }} className="mb-0">
                        <span className="card-sub" style={{ fontWeight: 400, fontSize: "14px" }}>{ exp.sub_title }</span>
                        <br/>
                        <span hidden={exp.date_started === ""} style={{ fontWeight: 400, fontSize: "13px", color: "black" }}>{ date_element } </span>
                        <br/>
                        <span className="card-location" style={{ fontSize: "12px", fontWeight: 500, color: props.dark_mode_props ? "rgba(226, 226, 226, 0.6)" : "rgba(0, 0, 0, 0.6)" }}> { exp.location } </span>
                    </p>
                  </div>
                </div>
                <div className={ exp.minimized ? "d-lg-none" : "d-lg-none" } >
                  <span hidden={ data_list[index].description.length === 0 } style={{ fontSize: "12px" }}>
                  <ExpandCollapse
                    previewHeight="88px"
                    expandText="more"
                    collapse={false}
                    style={{ lineHeight: 0.8 }}
                    >
                      { description_content }
                  </ExpandCollapse>


                  </span>
                </div>
                </>
              );

            });

            return (
                data_cards
            );
      } else {
        return (
            <span></span>
        );
      }



    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        dark_mode_props: state.dark_mode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);
