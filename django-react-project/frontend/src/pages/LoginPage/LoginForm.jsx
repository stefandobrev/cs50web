import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';

import InputField from '../../components/Inputs/InputField';
import PasswordField from '../../components/Inputs/PasswordField';

const LoginForm = ({ loginUserData }) => {
  const { handleSubmit, register } = useFormContext();

  return (
    <form onSubmit={handleSubmit(loginUserData)} className='space-y-3'>
      <InputField
        label='Username'
        id='login_username'
        registration={register('login_username')}
      />
      <PasswordField
        label='Password'
        id='login_password'
        registration={register('login_password')}
      />

      <div className='flex flex-col justify-center items-center space-y-2'>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded w-auto'
        >
          Sign In
        </button>
        <Link to='/register' className='text-blue-500 hover:underline'>
          Don't have an account? Register
        </Link>
      </div>
    </form>
  );
};
export default LoginForm;
