import React, { Component, Fragment } from "react";
import Pageheader from "./page-layout-elements/pageheader"; // page header module -- page title and header to be given
import * as Data from "./DATA.json"; // JSON data for the UI pages
import Navbar from "./page-layout-elements/navbar"; //module for the side navigation bar
import "./page-layout-elements/pagelayout.css"; //css file for the page layout
import MaterialTableDemo from "./adminconsole.jsx";

class PageTemplate extends Component {
  constructor(props) {
    super(props);
    this.toggleclass = this.toggleclass.bind(this);

    this.state = {
      title: Data.templatepage.title, //set the title of the section
      active: false, //states the status of the toggle for the navigation bar
      navdetails: Data.templatepage.navdetails.URL, //set the details for the navigation bar from the JSON
      pagetitle: Data.templatepage.pagetitle, //set the page title
      isHidden: true,
      testprops: "hello there",
      columns: [],
      data: [],
      isLoaded: false,
      isAuthorized: "failed",
    };
  }

  //handles the toggle function for the navigation bar
  toggleclass() {
    let currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  componentDidMount() {
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
    var req_sesaid =
      getUrlVars()["req_sesaid"] === undefined
        ? getUrlVars()["req_sesaid"]
        : getUrlVars()["req_sesaid"].replace("%20", " ");
    fetch(
      "https://7iyn0l5sr3-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/admincheckaccess",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username: req_sesaid }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({ isAuthorized: result.status });
      })
      .then(
        fetch(
          "https://7iyn0l5sr3-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/adminconsole",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              request: {
                requestDate: "2020-04-01 13:02:02",
                requestType: "retrive",
                requestAction: "getData",
              },
            }),
          }
        )
          .then((res) => res.json())
          .then((result) =>
            this.setState({
              columns: result.message.message.columns,
              data: result.message.message.data,
              isLoaded: true,
              isAuthorized: result.status,
            })
          )
      );
  }

  render() {
    console.log("--isauth--", this.state.isAuthorized);
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
              {this.state.isLoaded ? (
                this.state.isAuthorized === "success" ? (
                  <MaterialTableDemo
                    testprops={this.state.testprops}
                    columns={this.state.columns}
                    data={this.state.data}
                  />
                ) : (
                  <div className="denied">
                    <div class="content">
                      <h1>ERR:403</h1>
                      <div style={{ display: "inline-flex" }}>
                        <h3>ACCESS DENIED</h3>

                        <link
                          rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                        />

                        <i
                          class="fa fa-frown-o"
                          style={{ marginLeft: "15px", fontSize: "90px" }}
                        ></i>
                      </div>

                      <h5>
                        Sorry, you do not have access to this page. Please
                        report incase of any problem.
                      </h5>
                    </div>
                  </div>
                )
              ) : (
                <div class="loading-container">
                  <div class="loader"></div>
                  <div class="load-text">Loading...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PageTemplate;
