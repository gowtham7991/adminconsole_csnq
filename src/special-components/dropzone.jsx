import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";
import "./dropzone.css";
import "bootstrap/dist/css/bootstrap.css";

class DrapnDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted_file_extns: this.props.accepted_file_extns,
      mime_type: "",
      files: this.props.files,
    };
  }

  //handles any update in the props which are made in the parent --- assign the state variables accordingly
  componentWillReceiveProps(nextProps) {
    this.setState({ accepted_file_extns: nextProps.accepted_file_extns });
    var accepted_str = "";
    const accepted_files_bool = this.state.accepted_file_extns;

    accepted_files_bool.map((bool, index) =>
      bool
        ? index === 0
          ? accepted_str === ""
            ? (accepted_str +=
                "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            : (accepted_str +=
                ",application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
          : index === 1
          ? accepted_str === ""
            ? (accepted_str += ".csv")
            : (accepted_str += ",.csv")
          : index === 2
          ? accepted_str === ""
            ? (accepted_str += "application/pdf")
            : (accepted_str += ",application/pdf")
          : accepted_str === ""
          ? (accepted_str += "text/plain")
          : (accepted_str += ",text/plain")
        : ""
    );
    this.setState({ mime_type: accepted_str });
  }

  render() {
    return (
      <Fragment>
        <Dropzone
          onDrop={this.props.onDrop}
          accept={this.state.mime_type}
          disabled={
            !(
              this.state.accepted_file_extns[0] ||
              this.state.accepted_file_extns[1] ||
              this.state.accepted_file_extns[2] ||
              this.state.accepted_file_extns[3]
            )
          }
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div
                class="icon-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px",
                }}
              >
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <i
                  class="fa fa-upload"
                  style={{
                    color: "gray",
                    fontSize: "50px",
                    textAlign: "center",
                  }}
                ></i>
              </div>
              <p
                style={{
                  textAlign: "center",

                  fontWeight: "bold",
                  fontSize: "22px",

                  borderBottom: "3px",
                  color: "gray",
                }}
              >
                Drag 'n' Drop files here
              </p>
              <p
                style={{
                  textAlign: "center",

                  fontWeight: "bold",
                  fontSize: "22px",

                  borderBottom: "3px",
                  color: "gray",
                }}
              >
                or
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button className="btn btn-outline-primary" type="button">
                  Browse Files
                </button>
              </div>
            </div>
          )}
        </Dropzone>

        <div class="files">
          <h4>Files:</h4>
          <ul>
            {this.props.files.map((file, index) => (
              <div>
                *{" "}
                <li style={{ display: "inline-block", listStyle: "inside" }}>
                  {file.name}
                </li>
                {/* <i class="fa fa-trash" style={{}}></i> */}
                <span
                  className="fa-stack"
                  style={{
                    display: "inline-block",
                    cursor: "pointer",
                    margin: "4px",
                  }}
                >
                  <i
                    className="fa fa-square fa-stack-2x"
                    style={{ color: "#dc3545" }}
                  ></i>
                  <i
                    className="fa fa-close fa-stack-1x fa-inverse"
                    onClick={this.props.removeFile}
                  ></i>
                </span>
              </div>
            ))}
          </ul>
          {this.props.files.length > 0 ? (
            <button
              className="btn btn-danger btn-sm"
              onClick={this.props.removeAll}
              type="button"
              style={{ margin: "15px" }}
            >
              Remove All
            </button>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}

export default DrapnDrop;
