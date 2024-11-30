import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchUserSettings, updateUserSettings } from './helpers';
import { setLoading } from '../../store/slices/loadingSlice';
import EditButtons from '../../components/Buttons/EditButtons';
import InputField from '../../components/Inputs/InputField';
import PageTitle from '../../components/PageTitle';
import PasswordField from '../../components/Inputs/PasswordField';

export const ProfileSettingsPage = () => {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState({});
  const methods = useForm();

  const { handleSubmit, reset, watch } = methods;
  const [isEditing, setIsEditing] = useState(false);

  const password = watch('password');
  const confirm_password = watch('confirm_password');

  const isPasswordInvalid = () => {
    return password && confirm_password && password !== confirm_password;
  };

  useEffect(() => {
    const getUserSettings = async () => {
      const userSettings = await fetchUserSettings();
      setSettings(userSettings);
      reset(userSettings);
    };

    getUserSettings();
  }, [reset]);

  useEffect(() => {
    reset(settings);
  }, [isEditing, reset, settings]);

  const handleSave = async (profileData) => {
    try {
      dispatch(setLoading(true));
      await updateUserSettings(profileData);
      const updatedSettings = await fetchUserSettings();
      setSettings(updatedSettings);
      setIsEditing(false);
      console.log('profileData', profileData);
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <PageTitle title='Settings' />
      <div className='max-w-md mx-auto p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Profile Settings</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className='mb-4'>
              <InputField label='Email' id='email' readOnly={!isEditing} />
            </div>
            <div className='mb-4'>
              <InputField
                label='Username'
                id='username'
                readOnly={!isEditing}
              />
            </div>
            {isEditing && (
              <>
                <div className='mb-4'>
                  <PasswordField label='Password' id='password' />
                </div>
                <div className='mb-4'>
                  <PasswordField
                    label='Confirm Password'
                    id='confirm_password'
                  />
                </div>

                {/* Password feedback */}
                {isPasswordInvalid() && (
                  <p className='text-red-500'>Passwords don't match!</p>
                )}
              </>
            )}
            <div className='flex space-x-4'>
              <EditButtons
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isDisabled={isPasswordInvalid()}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
