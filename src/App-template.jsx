import React, { Component, Fragment } from "react";
import Pageheader from "./page-layout-elements/pageheader"; // page header module -- page title and header to be given
import * as Data from "./DATA.json"; // JSON data for the UI pages
import Navbar from "./page-layout-elements/navbar"; //module for the side navigation bar
import "./page-layout-elements/pagelayout.css"; //css file for the page layout
import VerticalTimeline from "./special-components/verticaltimeline";
import Widgets from "./UI-components/widgets";
// import "bootstrap/dist/css/bootstrap.css";  //install bootstrap and uncomment to start using bootstrap

//import the required modules from the directory

// a page consists a side nav bar, page header, and any tables or other stuff under the active area div.
// data is passed in as props from the parent page to all the components through the state.

class PageTemplate extends Component {
  constructor(props) {
    super(props);
    this.toggleclass = this.toggleclass.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      title: Data.templatepage.title, //set the title of the section
      active: false, //states the status of the toggle for the navigation bar
      navdetails: Data.templatepage.navdetails.URL, //set the details for the navigation bar from the JSON
      pagetitle: Data.templatepage.pagetitle, //set the page title
      timelineData: [
        { title: "step1", date: "01-01-1998", status: "completed" },
        { title: "step2", date: "02-01-1998", status: "completed" },
        { title: "step3", date: "03-01-1998", status: "not-started" },
        { title: "step4", date: "04-01-1998", status: "not-started" },
      ],
      file: null,
      widgetdata: Data.templatepage.widgetdata,
      //set the state if any additional component is imported and pass the data to the child component
    };
  }

  //handles the toggle function for the navigation bar
  toggleclass() {
    let currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  componentWillMount() {
    //if the website need details from LEAP extract the details from the URL params and assign it to state variables here
    //function which extracts the url params based on the key
    function getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
          vars[key] = value;
        }
      );
      return vars;
    }

    //make the api call to get the details about the logged in user - Authorization

    /* var AuthorizationURL = "";
    fetch(AuthorizationURL, {
      method: "",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    }); */
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  }
  render() {
    return (
      <Fragment>
        <Navbar
          active={this.state.active}
          navdetails={this.state.navdetails}
          ontoggle={this.toggleclass}
        />
        <div className={this.state.active ? "main1" : "main0"}>
          <div className="layout">
            <Pageheader
              title={this.state.title}
              pagetitle={this.state.pagetitle}
            />
          </div>
          <div className="activearea">
            <div className="data">
              {/* your code goes here..*/}

              {/* <div style={{ display: "grid", gridTemplateColumns: "20% 80%" }}>
                <h1 style={{ backgroundColor: "blue" }}>Hello from React</h1>
                <div
                  style={{
                    backgroundColor: "#cdcdcd",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                >
                  <VerticalTimeline timelineData={this.state.timelineData} />
                </div>
              </div> */}
              <Widgets widgetdata={this.state.widgetdata} />
              <br />
              <br />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PageTemplate;
