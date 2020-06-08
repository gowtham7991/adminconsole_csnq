import React, { Component, Fragment } from "react";
import "./alert.css";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: this.props.isHidden,
    };
  }
  //handles any update in the props which are made in the parent
  componentWillReceiveProps(nextProps) {
    this.setState({ isHidden: nextProps.isHidden });
  }
  render() {
    return (
      <Fragment>
        <div>
          <div
            className={this.state.isHidden ? "alert-box-hidden" : "alert-box"}
          >
            <div className="alert-content">
              <div
                class="close-btn"
                onClick={() => this.setState({ isHidden: true })}
              >
                +
              </div>
              <h5>{this.props.title}</h5>
              <p>{this.props.body}</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Alert;
