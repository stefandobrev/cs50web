import { useFormContext } from 'react-hook-form';

import InputField from '../../components/Inputs/InputField';
import PasswordField from '../../components/Inputs/PasswordField';
import { SaveButton } from '../../components/Buttons/EditButtons';

const RegistrationForm = ({ registerUser, message }) => {
  const { handleSubmit, watch } = useFormContext();

  const password = watch('password');
  const confirm_password = watch('confirm_password');

  const isPasswordInvalid =
    password && confirm_password && password !== confirm_password;

  return (
    <form onSubmit={handleSubmit(registerUser)} className='space-y-4'>
      <InputField label='First Name' id='first_name' />
      <InputField label='Last Name' id='last_name' />
      <InputField label='Username' id='username' />
      <InputField label='Email' id='email' />
      <PasswordField label='Password' id='password' />
      <PasswordField label='Confirm Password' id='confirm_password' />

      {/* Password feedback */}
      {isPasswordInvalid && (
        <p className='text-red-500'>Passwords don't match!</p>
      )}

      {/* Show message */}
      {message && <p className={'text-red-500'}>{message.text}</p>}

      {/* Submit Button */}
      <div className='flex justify-center'>
        <SaveButton disabled={isPasswordInvalid}>Add User</SaveButton>
      </div>
    </form>
  );
};
export default RegistrationForm;
