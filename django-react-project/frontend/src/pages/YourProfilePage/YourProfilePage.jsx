import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { updateUserProfile } from './helpers';
import { setLoading } from '../../store/slices/loadingSlice';
import { fetchProfileData } from '../../store/slices/userSlice';
import EditButtons from '../../components/Buttons/EditButtons';
import InputField from '../../components/Inputs/InputField';
import PageTitle from '../../components/PageTitle';

export const YourProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    reset(profile);
  }, [profile, reset, isEditing]);

  const handleSave = async (profileData) => {
    try {
      dispatch(setLoading(true));
      await updateUserProfile(profileData);
      dispatch(fetchProfileData());
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSave)}>
        <PageTitle title='Edit Profile' />
        <div className='max-w-md mx-auto p-6'>
          <h1 className='text-2xl font-semibold mb-4'>Your Profile</h1>
          <div className='mb-4'>
            <InputField
              label='First Name'
              id='first_name'
              readOnly={!isEditing}
            />
          </div>
          <div className='mb-6'>
            <InputField
              label='Last Name'
              id='last_name'
              readOnly={!isEditing}
            />
          </div>
          <div className='flex space-x-4'>
            <EditButtons isEditing={isEditing} setIsEditing={setIsEditing} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
