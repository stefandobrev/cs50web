import InputField from './InputField';
import { useFormContext } from 'react-hook-form';

const LoginForm = ({ loginUserData }) => {
  const { register, handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(loginUserData)} className='space-y-4'>
      <InputField
        label='Username'
        id='login_username'
        register={register}
        required={true}
      />
      <InputField
        label='Password'
        id='login_password'
        register={register}
        required={true}
      />

      {/* Submit Button */}
      <div className='flex justify-center'>
        <button
          type='submit'
          className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
        >
          Sign In
        </button>
      </div>
    </form>
  );
};
export default LoginForm;
