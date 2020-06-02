import React, { Component, Fragment } from "react";
import "./table.css";

class Table extends Component {
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
          {this.state.tabledata.map((table, index) => (
            <table class="tabledata" key={index}>
              <caption>{table["caption"]}</caption>
              {table["tr"].map((item, index1) =>
                Object.keys(item) == "th" ? (
                  <thead>
                    <tr key={index} id={index1}>
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
                        <th
                          rowSpan={rowdata["rowspan"]}
                          class="rowheader"
                          id={index3}
                        >
                          {rowdata["col"] == "Team" ? (
                            <div id="Team">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: rowdata["value"],
                                }}
                              />
                            </div>
                          ) : (
                            rowdata["value"]
                          )}
                        </th>
                      ) : rowdata["type"] == "td" ? (
                        <td
                          rowSpan={rowdata["rowspan"]}
                          key={index3}
                          id={rowdata["border"] ? "border" : ""}
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
                            ""
                          )}
                        </td>
                      ) : rowdata["type"] == "widgets" ? (
                        <td
                          rowSpan={rowdata["rowspan"]}
                          key={index3}
                          id={index3}
                        >
                          {/* <Widgets widgetdata={rowdata["value"]} /> */}
                        </td>
                      ) : (
                        <td
                          rowSpan={rowdata["rowspan"]}
                          key={index3}
                          id={index3}
                        >
                          {/* <ProgressBar
                            section1={rowdata["value"]["progress"]["section1"]}
                            section2={rowdata["value"]["progress"]["section2"]}
                            section3={rowdata["value"]["progress"]["section3"]}
                            section4={rowdata["value"]["progress"]["section4"]}
                            section5={rowdata["value"]["progress"]["section5"]}
                          /> */}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
              <br />
            </table>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Table;
