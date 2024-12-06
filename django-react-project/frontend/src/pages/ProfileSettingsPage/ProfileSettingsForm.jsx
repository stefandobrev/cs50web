import { useFormContext } from 'react-hook-form';
import InputField from '../../components/Inputs/InputField';
import PasswordField from '../../components/Inputs/PasswordField';
import Button from '../../components/Buttons/Button';
import {
  SaveButton,
  CancelButton,
  EditButton,
} from '../../components/Buttons/EditButtons';

export const ProfileSettingsPageForm = ({
  isEditing,
  setIsEditing,
  onSubmit,
  onPasswordChange,
}) => {
  const { watch } = useFormContext();

  const password = watch('password');
  const confirm_password = watch('confirm_password');

  const isPasswordInvalid = () => {
    return password && confirm_password && password !== confirm_password;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='mb-4'>
        <InputField label='Email' id='email' readOnly={!isEditing} />
      </div>
      <div className='mb-4'>
        <InputField label='Username' id='username' readOnly={!isEditing} />
      </div>
      {isEditing && (
        <>
          <div className='mb-4'>
            <PasswordField label='Password' id='password' />
          </div>
          <div className='mb-4'>
            <PasswordField label='Confirm Password' id='confirm_password' />
          </div>

          {/* Password feedback */}
          {isPasswordInvalid() && (
            <p className='text-red-500'>Passwords don't match!</p>
          )}
        </>
      )}
      <div className='flex space-x-4'>
        {isEditing ? (
          <>
            <SaveButton disabled={isPasswordInvalid()} />
            <CancelButton onClick={() => setIsEditing(false)} />
          </>
        ) : (
          <>
            <EditButton onClick={() => setIsEditing(true)} />
            <Button
              variant='secondary'
              onClick={(e) => {
                e.preventDefault();
                if (onPasswordChange) {
                  onPasswordChange();
                }
              }}
              aria-label='Change Password'
            >
              Change Password
            </Button>
          </>
        )}
      </div>
    </form>
  );
};