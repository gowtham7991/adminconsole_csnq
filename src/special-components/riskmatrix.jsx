import React, { Component, Fragment } from "react";
import "./risktable.css";
import ProgressBar from "./progressbar";

class RiskTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabledata: this.props.tabledata,
    };
  }
  componentWillReceiveProps(nextprops) {
    this.setState({ tabledata: nextprops.tabledata });
  }
  render() {
    return (
      <Fragment>
        <div>
          {this.props.tabledata.map((table, index) => (
            <table class="risktable" key={index}>
              {table["tr"].map((item, index1) =>
                Object.keys(item) == "tf" ? (
                  <tfoot id="footer">
                    <tr key={index}>
                      {item["tf"].map((heading, index2) => (
                        <td colSpan={heading["colspan"]} key={index2}>
                          {heading["value"]}
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                ) : Object.keys(item) == "th" ? (
                  <thead>
                    <tr key={index}>
                      {item["th"].map((heading, index2) => (
                        <th colSpan={heading["colspan"]} key={index2}>
                          {heading["value"]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                ) : (
                  <tr key={index1} id={index1}>
                    {item["td"].map((rowdata, index3) =>
                      rowdata["type"] == "th" ? (
                        <th rowSpan={rowdata["rowspan"]} id="rowheader">
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: rowdata["value"],
                              }}
                            />
                          }
                        </th>
                      ) : (
                        <td
                          rowSpan={rowdata["rowspan"]}
                          colSpan={rowdata["colspan"]}
                          key={index3}
                          id={"index" + index1 + index3}
                        >
                          {typeof rowdata["value"] == "string" ? (
                            <span class="inner">{rowdata["value"]}</span>
                          ) : Object.keys(rowdata["value"])[0] == "URL" ? (
                            <a
                              href={rowdata["value"]["URL"]["_href"]}
                              onClick={() =>
                                this.props.changeTable(
                                  rowdata["value"]["URL"]["_href"]
                                )
                              }
                            >
                              {rowdata["value"]["URL"]["__text"]}
                            </a>
                          ) : Object.keys(rowdata["value"])[0] == "icon" ? (
                            <span
                              id={rowdata["value"]["icon"]["__text"]}
                              class="inner"
                            ></span>
                          ) : (
                            <ProgressBar
                              section1={
                                rowdata["value"]["progress"]["section1"]
                              }
                              section2={
                                rowdata["value"]["progress"]["section2"]
                              }
                              section3={
                                rowdata["value"]["progress"]["section3"]
                              }
                              section4={
                                rowdata["value"]["progress"]["section4"]
                              }
                              section5={
                                rowdata["value"]["progress"]["section5"]
                              }
                            />
                          )}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </table>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default RiskTable;
