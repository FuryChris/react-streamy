import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  //   Równoważna wersja:
  // renderInput(formProps) {
  //   console.log(formProps);
  //   return (
  //     <div className="field">
  //       <label htmlFor=""></label>
  //       <input {...formProps.input} />
  //     </div>
  //   );
  // }
  //  JESZCZE BARDZIEJ SKRÓCONA WERSJA:

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  // można przekazać konkretnie "initialValues" jako props i ReactForm sam to ogarnie i da jako initial
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValidate) => {
  const errors = {};
  if (!formValidate.title) {
    //is user did not entered title
    errors.title = 'You must enter a title';
  }

  if (!formValidate.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate: validate,
})(StreamForm);
