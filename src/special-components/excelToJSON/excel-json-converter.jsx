import React, { Component } from "react";
import XLSX from "xlsx";
import { make_cols } from "./MakeColumns";
import { SheetJSFT } from "./types";
import "./colselectTable.css";

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      isHidden: this.props.isHidden,
      selectedFile: "",
      selectedCols: [],
      isColChecked: [],
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      isHidden: nextprops.isHidden,
    });
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0])
      this.setState({ file: files[0], selectedFile: files[0]["name"] });
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const colChecked = {};
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
        sheetRows: 6,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      Object.keys(data[0]).map((col) => (colChecked[col] = false));
      /* Update state */
      this.setState(
        { data: data, isColChecked: colChecked, cols: make_cols(ws["!ref"]) },
        () => {
          console.log(JSON.stringify(this.state.data, null, 2));
        }
      );
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  handleCheckbox(event) {
    var selectedCol = event.target.id;
    var selectedCols = this.state.selectedCols;
    var isColCheckedCurr = this.state.isColChecked;
    var isChecked = isColCheckedCurr[selectedCol];
    isColCheckedCurr[selectedCol] = !isChecked;
    if (!isChecked) {
      selectedCols.push(selectedCol);
    }
    this.setState({
      isColChecked: isColCheckedCurr,
      selectedCols: selectedCols,
    });
    console.log("==ok==");
  }

  //is used to set parent isHidden state to true
  handleClose() {
    this.setState({ isHidden: true });
    var isHidden = this.state.isHidden;
    this.props.handleClose(true);
  }

  render() {
    return (
      <div>
        <div className={this.state.isHidden ? "alert-box-hidden" : "alert-box"}>
          <div className="alert-content">
            <div
              class="close-btn"
              onClick={() => this.setState({ isHidden: true })}
            >
              +
            </div>
            <h5>Upload an excel to trigger Data Masking</h5>
            <label
              htmlFor="file"
              id="form-control"
              className="form-control-label"
            >
              Choose File
            </label>
            <input
              type="file"
              className="form-control"
              id="file"
              accept={SheetJSFT}
              onChange={this.handleChange}
            />
            <label onClick={this.handleFile} className="btn-colselect">
              Choose Columns
            </label>
            <h6>File:{this.state.selectedFile}</h6>
            {this.state.data.length === 0 ? (
              ""
            ) : (
              <table className="col-select">
                <thead>
                  {Object.keys(this.state.data[0]).map((header) => (
                    <th>
                      <input
                        type="checkbox"
                        style={{ display: "inline-block", marginRight: "5px" }}
                        onChange={this.handleCheckbox}
                        id={header}
                        checked={this.state.isColChecked[header]}
                      />
                      <span style={{ display: "inline-block" }}>{header}</span>
                    </th>
                  ))}
                </thead>
                <tbody>
                  {this.state.data.map((row) => (
                    <tr>
                      {Object.keys(row).map((cell) => (
                        <td>{row[cell]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* add a submit func to work with selectcols array -- view selected cols in console log */}
            <button
              className="submit"
              onClick={() =>
                console.log(
                  "choosen cols in the table are ",
                  this.state.selectedCols
                )
              }
            >
              submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ExcelReader;
