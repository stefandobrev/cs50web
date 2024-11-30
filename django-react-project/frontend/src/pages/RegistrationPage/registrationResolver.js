// Custom validation function
const registrationResolver = async (data) => {
  const errors = {};

  // Example validations
  if (!data.username) {
    errors.username = {
      type: 'required',
      message: 'Username is required',
    };
  } else if (data.username.length < 3) {
    errors.username = {
      type: 'minLength',
      message: 'Username must be at least 3 characters long',
    };
  }

  if (!data.email) {
    errors.email = {
      type: 'required',
      message: 'Email is required',
    };
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = {
      type: 'pattern',
      message: 'Invalid email address',
    };
  }

  if (!data.password) {
    errors.password = {
      type: 'required',
      message: 'Password is required',
    };
  } else if (data.password.length < 8) {
    errors.password = {
      type: 'minLength',
      message: 'Password must be at least 8 characters long',
    };
  }

  return {
    values: data,
    errors: Object.keys(errors).length > 0 ? errors : {},
  };
};

export default registrationResolver;
