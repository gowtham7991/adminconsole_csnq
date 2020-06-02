import React, { Component, Fragment } from "react";
import "./progressbar.css";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section1: this.props.section1,
      section2: this.props.section2,
      section3: this.props.section3,
      section4: this.props.section4,
      section5: this.props.section5,
    };
  }
  render() {
    return (
      <Fragment>
        <div class="container">
          <ul class="progressbar">
            <li class={this.state.section1}></li>
            <li class={this.state.section2}></li>
            <li class={this.state.section3}></li>
            <li class={this.state.section4}></li>
            <li class={this.state.section5}></li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default ProgressBar;
