import InputField from './InputField';
import { useFormContext } from 'react-hook-form';

const RegistrationForm = ({ registerUser, message }) => {
  const { register, handleSubmit, watch } = useFormContext();

  const password = watch('password');
  const confirm_password = watch('confirm_password');

  return (
    <form onSubmit={handleSubmit(registerUser)} className='space-y-4'>
      <InputField
        label='First Name'
        id='first_name'
        register={register}
        required={true}
      />
      <InputField
        label='Last Name'
        id='last_name'
        register={register}
        required={true}
      />
      <InputField
        label='Username'
        id='username'
        register={register}
        required={true}
      />
      <InputField
        label='Email'
        id='email'
        type='email'
        register={register}
        required={true}
      />
      <InputField
        label='Password'
        id='password'
        type='password'
        register={register}
        required={true}
      />
      <InputField
        label='Confirm Password'
        id='confirm_password'
        type='password'
        register={register}
        required={true}
      />

      {/* Password feedback */}
      {password && confirm_password && password !== confirm_password && (
        <p className='text-red-500'>Passwords don't match!</p>
      )}

      {/* Show message */}
      {message && (
        <p
          className={
            message.type === 'error' ? 'text-red-500' : 'text-green-500'
          }
        >
          {message.text}
        </p>
      )}

      {/* Submit Button */}
      <div className='flex justify-center'>
        <button
          type='submit'
          className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
        >
          Add User
        </button>
      </div>
    </form>
  );
};
export default RegistrationForm;
