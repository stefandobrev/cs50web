import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import {
  fetchUserSettings,
  updateUserSettings,
  updateUserPassword,
} from './helpers';
import { setLoading } from '../../store/slices/loadingSlice';
import { logoutWithBlacklist } from '../../store/slices/authSlice';
import PageTitle from '../../components/PageTitle';
import { ProfileSettingsPageForm } from './ProfileSettingsForm';
import { PasswordSettingsForm } from './PasswordSettingsForm';
import sharedResolver from '../../utils/sharedResolver';

export const ProfileSettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({});
  const methods = useForm({ resolver: sharedResolver });
  const { handleSubmit, reset } = methods;
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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
    reset(settings);
  }, [isEditing, reset, settings]);

  const handleSave = async (profileData) => {
    try {
      dispatch(setLoading(true));
      await updateUserSettings(profileData);
      const updatedSettings = await fetchUserSettings();
      setSettings(updatedSettings);
      setIsEditing(false);
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePasswordSave = async (passwordData) => {
    try {
      dispatch(setLoading(true));
      await updateUserPassword(passwordData);
      dispatch(logoutWithBlacklist());
      navigate('/login');
      toast.success('Password updated successfully. Please log in again.');
    } catch (error) {
      console.log(error.response);

      const errorMessages = Object.values(error.response || {}).flat();
      const errorMessage =
        errorMessages.length > 0
          ? errorMessages[0]
          : 'Failed to update password';
      toast.error(errorMessage);
      return;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePasswordChange = () => {
    setIsChangingPassword(true);
  };

  return (
    <>
      <PageTitle title='Settings' />
      <div className='max-w-md mx-auto p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Profile Settings</h1>
        <FormProvider {...methods}>
          {isChangingPassword ? (
            <PasswordSettingsForm
              onSubmit={handleSubmit(handlePasswordSave)}
              onCancel={() => {
                setIsChangingPassword(false);
                reset(settings);
              }}
            />
          ) : (
            <ProfileSettingsPageForm
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              onSubmit={handleSubmit(handleSave)}
              onPasswordChange={handlePasswordChange}
            />
          )}
        </FormProvider>
      </div>
    </>
  );
};
