// withValidation.js
import React, { Component } from 'react';

const SignupAspect = (WrappedComponent) => {
  return class WithValidation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isValid: true,
        errorMessage: '',
      };
    }

    validateInput = (email, password, confirmPassword) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

      let isValid = true;
      let errorMessage = '';

      if (!emailRegex.test(email)) {
        errorMessage = "Invalid Email. Please enter a valid Email";
        isValid = false;
      } else if (!password || !confirmPassword) {
        errorMessage = "Passwords should not be blank.";
        isValid = false;
      } else if (!passwordRegex.test(password)) {
        errorMessage = "Invalid Password. Password must contain at least 8 characters with one uppercase letter, one lowercase letter, and one digit.";
        isValid = false;
      } else if (password !== confirmPassword) {
        errorMessage = "Passwords do not match. Please ensure both passwords are the same.";
        isValid = false;
      }

      this.setState({
        isValid,
        errorMessage
      });

      console.log("Sign Up (Aspect) is Valid? " + isValid);


      return isValid;
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          validateInput={this.validateInput}
          isValid={this.state.isValid}
          errorMessage={this.state.errorMessage}
        />
      );
    }
  };
};

export default SignupAspect;
