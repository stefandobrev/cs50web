export const addUser = async (userRegisterData) => {
  const token = localStorage.getItem('access_token');

  try {
    const responseAddUser = await fetch('/api/user/create-user/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRegisterData),
    });

    if (!responseAddUser.ok) {
      const errorAddUserData = await responseAddUser.json();

      // Check if errorAddUserData contains a 'text' field with errors
      if (errorAddUserData && errorAddUserData.text) {
        const errorMessage = Object.values(errorAddUserData.text)[0];
        return {
          type: 'error',
          text: errorMessage || 'Something went wrong',
        };
      }

      return {
        type: 'error',
        text: 'Something went wrong',
      };
    }

    return {
      type: 'success',
      text: 'User created successfully!',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      type: 'error',
      text: 'Network error. Please try again later.',
    };
  }
};

export const loginUser = async (userLoginData) => {
  try {
    const responseLoginUser = await fetch('/api/user/login/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLoginData),
    });

    if (!responseLoginUser.ok) {
      const errorData = await responseLoginUser.json();
      return {
        type: 'error',
        text:
          errorData.message || 'Login failed. Please check your credentials.',
      };
    }

    const responseData = await responseLoginUser.json();

    localStorage.setItem('access_token', responseData.access);
    localStorage.setItem('refresh_token', responseData.refresh);

    return {
      type: 'success',
      text: responseData.message || 'Login successful!',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      type: 'error',
      text: 'Network error. Please try again later.',
    };
  }
};
