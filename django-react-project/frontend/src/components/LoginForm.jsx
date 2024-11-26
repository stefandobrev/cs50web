import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';

import InputField from './Inputs/InputField';
import PasswordField from './Inputs/PasswordField';

const LoginForm = ({ loginUserData }) => {
  const { handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(loginUserData)} className='space-y-4'>
      <InputField label='Username' id='login_username' />
      <PasswordField label='Password' id='login_password' />

      {/* Submit Button */}
      <div className='flex flex-col justify-center items-center'>
        <button
          type='submit'
          className='mt-4 bg-blue-500 text-white py-2 px-4 rounded w-auto'
        >
          Sign In
        </button>
        <Link to='/register' className='mt-2 text-blue-500 hover:underline'>
          Don't have an account? Register
        </Link>
      </div>
    </form>
  );
};
export default LoginForm;
