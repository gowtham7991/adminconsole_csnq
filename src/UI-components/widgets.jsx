import React, { Component, Fragment } from "react";
import "./widgets.css";
import { Formik } from "formik"; //instal formik and yup for form handling and validation -- uncomment when installed
import * as Yup from "yup";
// import "bootstrap/dist/css/bootstrap.css"; //install bootstrap and then uncomment to make use of the library

class Widgets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      widgetdata: this.props.widgetdata,
    };
  }

  //handles any update in the props which are made in the parent
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
        ? (keys[`${widget.name}`] = widget.options[0])
        : widget.category == "fieldset"
        ? widget.fields.map((field, index) => (keys[`${field.name}`] = ""))
        : (keys[`${widget.name}`] = "")
    );

    //loop to create the validation schema
    this.state.widgetdata.map((widget, index) => "");

    //validation schema for the form fields
    let formValidationSchema = Yup.object().shape({
      // enter fields required for validation
      /* Name: Yup.string().required("please enter the required info!"),
      Designation: Yup.string(),
      "SESA-ID": Yup.string().required("please enter the required info!"), */
      // currently doesnot automatically validates the fields. Enter the fields with names to perform the validation
    });

    return (
      <div>
        <Formik
          initialValues={keys}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setTimeout(() => {
              //write your on submit func here

              console.log("values", values);

              setSubmitting(false);
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
              <div className="widgets">
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
                        min={this.state.today}
                        max={this.state.maxDate}
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
                    <div className="textarea">
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
                    <div>
                      <h1>hii</h1>
                    </div>
                  ) : widget.category == "checkbox" ? (
                    <div className="checkbox">
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
                      <div
                        className="fieldset "
                        style={{
                          border: "1px solid #CCC",
                          borderRadius: "4px",
                          padding: "8px",
                        }}
                      >
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
                    </div>
                  ) : widget.category == "radio" ? (
                    <div className="widget">
                      <label>{widget.label}</label>
                      {widget.options.map((option, index) => (
                        <div>
                          <input
                            type="radio"
                            id={option.id}
                            name={option.name}
                            value={values[`${option.id}`]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <label
                            for="male"
                            style={{ display: "inline-block " }}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : widget.type === "Submit" ? (
                    <div class="button">
                      <button
                        id={widget.type}
                        type={widget.type}
                        disabled={isSubmitting}
                      >
                        {widget.type}
                      </button>
                    </div>
                  ) : (
                    <div class="button">
                      <button
                        id={widget.type}
                        type={widget.type}
                        disabled={isSubmitting}
                        onClick={() => console.log("redirecting to new page ")}
                      >
                        {widget.label}
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
