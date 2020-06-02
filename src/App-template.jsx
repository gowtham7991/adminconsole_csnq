import React, { Component, Fragment } from "react";
import Pageheader from "./page-layout-elements/pageheader"; // page header module -- page title and header to be given
import * as Data from "./DATA.json"; // JSON data for the UI pages
import Navbar from "./page-layout-elements/navbar"; //module for the side navigation bar
import "./page-layout-elements/pagelayout.css"; //css file for the page layout
// import "bootstrap/dist/css/bootstrap.css";  //install bootstrap and uncomment to start using bootstrap

//import the required modules from the directory

// a page consists a side nav bar, page header, and any tables or other stuff under the active area div.
// data is passed in as props from the parent page to all the components through the state.

class PageTemplate extends Component {
  constructor(props) {
    super(props);
    this.toggleclass = this.toggleclass.bind(this);
    this.state = {
      title: Data.templatepage.title, //set the title of the section
      active: false, //states the status of the toggle for the navigation bar
      navdetails: Data.templatepage.navdetails.URL, //set the details for the navigation bar from the JSON
      pagetitle: Data.templatepage.pagetitle, //set the page title

      //set the state if any additional component is imported and pass the data to the child component
    };
  }

  //handles the toggle function for the navigation bar
  toggleclass() {
    let currentState = this.state.active;
    this.setState({ active: !currentState });
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
              <h1>Hello from React</h1>
              {/* your code goes here..*/}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PageTemplate;
