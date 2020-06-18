import React, { Component, Fragment } from "react";
import "./verticaltimeline.css";

class VerticalTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineData: this.props.timelineData,
    };
  }

  //handles any update in the props which are made in the parent
  componentWillReceiveProps(nextprops) {
    this.setState({ timelineData: nextprops.timelineData });
  }

  render() {
    return (
      <Fragment>
        <div class="timeline-area">
          {this.state.timelineData.map((item, index) => (
            <div class="timeline-container">
              <div key={index} class={item.status}></div>
              <h7>{item.title}</h7>
              <h7>{item.date}</h7>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default VerticalTimeline;
