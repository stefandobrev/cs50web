import { useFormContext } from 'react-hook-form';
import PasswordField from '../../components/inputs/PasswordField';
import { SaveButton, CancelButton } from '../../components/buttons/EditButtons';

export const PasswordForm = ({ onSubmit, onCancel }) => {
  const { watch } = useFormContext();

  const newPassword = watch('new_password');
  const confirmPassword = watch('confirm_password');

  const isPasswordInvalid = () => {
    return newPassword && confirmPassword && newPassword !== confirmPassword;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='mb-4'>
        <PasswordField label='Current Password' id='current_password' />
      </div>
      <div className='mb-4'>
        <PasswordField label='New Password' id='new_password' />
      </div>
      <div className='mb-4'>
        <PasswordField label='Confirm New Password' id='confirm_password' />
      </div>

      {isPasswordInvalid() && (
        <p className='text-red-500'>Passwords don't match!</p>
      )}

      <div className='flex space-x-4'>
        <SaveButton disabled={isPasswordInvalid()} />
        <CancelButton onClick={onCancel} />
      </div>
    </form>
  );
};
