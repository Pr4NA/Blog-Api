function Validate(values) {
    const errors = {};
  
    if (!values.username) {
      errors.username = 'Username is required';
    } else if (values.username.length < 4) {
      errors.username = 'Username must be at least 4 characters';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
  
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors;
  }
  
  export default Validate;
  