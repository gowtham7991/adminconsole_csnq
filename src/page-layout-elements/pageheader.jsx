import React, { Component, Fragment } from "react";
import "./pageheader.css";
class Pageheader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      pagetitle: this.props.pagetitle,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ title: nextProps.title });
  }
  render() {
    return (
      <Fragment>
        <div className="pageheader">
          <h6>{this.state.pagetitle}</h6>
          <a href="#help">help/report issues</a>

          <h3 id="title">{this.state.title}</h3>
          <hr id="line-separator"></hr>
        </div>
      </Fragment>
    );
  }
}

export default Pageheader;
