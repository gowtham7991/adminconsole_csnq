import React, { Component, Fragment } from "react";
import "./widget.css";
// import { Formik } from "formik"; //instal formik and yup for form handling and validation -- uncomment when installed
// import * as Yup from "yup";
// import "bootstrap/dist/css/bootstrap.css"; //install bootstrap and then uncomment to make use of the library

class Widgets extends Component {
  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
    this.state = {
      widgetdata: this.props.widgetdata,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      widgetdata: nextProps.widgetdata,
    });
  }

  render() {
    let keys = {}; //holds our intivial values to bind the form data

    //loop over the widgets data to populate initial values
    this.state.widgetdata.map((widget, index) =>
      widget.category == "button"
        ? ""
        : widget.category == "checkbox-tree"
        ? ((keys[`${widget.parent.name}`] = false),
          widget.children.map(
            (child, index) => (keys[`${child.name}`] = false)
          ))
        : widget.category == "checkbox-question"
        ? widget.options.map(
            (option, index) => (keys[`${option.name}`] = false)
          )
        : widget.category == "select"
        ? (keys[`${widget.name}`] = keys[`${field.name}`] = options[0])
        : widget.name == "fieldset"
        ? widget.fields.map((field, index) => (keys[`${field.name}`] = ""))
        : (keys[`${widget.name}`] = "")
    );

    //loop to create the validation schema
    this.state.widgetdata.map((widget, index) => "");

    //validation schema for the form fields
    let formValidationSchema = Yup.object().shape({
      /* Name: Yup.string().required("please enter the required info!"),
      Designation: Yup.string(),
      "SESA-ID": Yup.string().required("please enter the required info!"), */
      // currently doesnot automatically validates the fields. Enter the fields with names to perform the validation
    });

    return (
      <div>
        <Formik
          initialValues={keys}
          validationSchema={formValidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setTimeout(() => {
              console.log("handles on submit function");

              // perform onsubmit function here
              resetForm();
            }, 500);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <div class="widgets">
                {this.state.widgetdata.map((widget, index) =>
                  widget.category == "input" ? (
                    <div className="widget">
                      <legend>{widget.legend}</legend>
                      <label htmlFor={widget.name}>{widget.label}</label>
                      <input
                        type={widget.type}
                        id={widget.id}
                        name={widget.name}
                        value={values[`${widget.name}`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={widget.placeholder}
                        className={
                          errors[`${widget.name}`] &&
                          touched[`${widget.name}`] &&
                          "error"
                        }
                        min="0"
                      />
                      {errors[`${widget.name}`] &&
                        touched[`${widget.name}`] && (
                          <div className="input-feedback">{errors.Name}</div>
                        )}
                    </div>
                  ) : widget.category == "select" ? (
                    <div className="widget">
                      <label htmlFor={widget.name}>{widget.label}</label>
                      <select
                        id={widget.id}
                        name={widget.name}
                        value={values[`${widget.name}`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {widget.options.map((option, index1) => (
                          <option value={widget.option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ) : widget.category == "textarea" ? (
                    <div className="widget">
                      <label for={widget.name}>{widget.label}</label>
                      <textarea
                        rows={widget.rows}
                        cols={widget.cols}
                        id={widget.id}
                        name={widget.name}
                        value={values[`${widget.name}`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></textarea>
                    </div>
                  ) : widget.category == "dropzone" ? (
                    <div className="dropzone">
                      <DragnDrop
                        onDrop={this.props.onDrop}
                        files={this.props.files}
                        removeAll={this.props.removeAll}
                        removeFile={this.props.removeFile}
                        accepted_file_extns={[
                          values["Q1-option1"],
                          values["Q1-option2"],
                          values["Q1-option3"],
                          values["Q1-option4"],
                        ]}
                      />
                    </div>
                  ) : widget.category == "checkbox" ? (
                    <div className="widget">
                      <legend>{widget.legend}</legend>
                      <input
                        type={widget.type}
                        id={widget.id}
                        name={widget.name}
                        checked={values[`${widget.name}`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <label>{widget.label}</label>
                    </div>
                  ) : widget.category == "checkbox-tree" ? (
                    <div className="widget">
                      <input
                        type={widget.parent.type}
                        id={widget.parent.id}
                        name={widget.parent.name}
                        checked={values[`${widget.parent.name}`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label>{widget.parent.label}</label>
                      <div class="suboption" style={{ marginLeft: "30px" }}>
                        {widget.children.map((child, index) => (
                          <div>
                            <input
                              type={child.type}
                              id={child.id}
                              name={child.name}
                              checked={values[`${widget.name}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <label>{child.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : widget.category == "checkbox-question" ? (
                    <div className="widget">
                      <label>{widget.question}</label>
                      <div class="options" style={{ marginLeft: "30px" }}>
                        {widget.options.map((option, index) => (
                          <div>
                            <input
                              type={option.type}
                              id={option.id}
                              name={option.name}
                              checked={values[`${widget.name}`]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{ display: "inline-block" }}
                            />
                            <label style={{ display: "inline-block" }}>
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : widget.category == "fieldset" ? (
                    <div className="widget">
                      <label>{widget.label}</label>
                      {widget.fields.map((field, index) => (
                        <div>
                          <label htmlFor={field.name} id="field">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            id={"field"}
                            name={field.name}
                            value={values[`${field.name}`]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={widget.placeholder}
                            className={
                              errors[`${field.name}`] &&
                              touched[`${field.name}`] &&
                              "error"
                            }
                            min="0"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div class="button">
                      <button
                        id={widget.type}
                        type={widget.type}
                        disabled={isSubmitting}
                      >
                        {widget.type}
                      </button>
                    </div>
                  )
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Widgets;
