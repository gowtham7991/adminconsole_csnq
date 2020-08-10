import React, { Component, Fragment } from "react";
import "./navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navdetails: this.props.navdetails,
      active: this.props.active,
    };
    console.log(this.state.active);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ navdetails: nextProps.navdetails });
  }

  render() {
    return (
      <Fragment>
        <div className="navigation">
          <div
            id={this.props.active ? "menushrink-inactive" : "menushrink-active"}
          >
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <i
              class="fa fa-bars"
              onClick={this.props.ontoggle}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <div id={this.props.active ? "menu-active" : "menu-inactive"}>
            <i
              class="fa fa-times"
              onClick={this.props.ontoggle}
              style={{
                float: "right",
                fontSize: 20,
                color: "white",
                cursor: "pointer",
              }}
            ></i>
            <div
              className="navlinks"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",

                height: "90%",
              }}
            >
              {this.state.navdetails.map((url, index) =>
                url["_type"] === "home" || url["_type"] === "footer" ? (
                  <a
                    id={url["_type"]}
                    href={url["_href"]}
                    target="_blank"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.reload();
                    }}
                  >
                    {url["__text"]}
                  </a>
                ) : (
                  <a id={url["_type"]} href={url["_href"]} target="_blank">
                    {url["__text"]}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Navbar;
