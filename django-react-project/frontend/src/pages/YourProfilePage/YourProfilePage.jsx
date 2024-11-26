import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { updateUserProfile } from './helpers';
import { setLoading } from '../../store/slices/loadingSlice';
import { fetchProfileData } from '../../store/slices/userSlice';
import InputField from '../../components/Inputs/InputField';

const YourProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const methods = useForm({
    defaultValues: {
      first_name: profile.first_name,
      last_name: profile.last_name,
    },
  });
  const { handleSubmit, reset } = methods;
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    reset(profile);
  }, [profile, reset]);

  const handleSave = async (profileData) => {
    try {
      dispatch(setLoading(true));
      await updateUserProfile(profileData);
      dispatch(fetchProfileData());
      console.log('Saved:', profileData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error('Error updating profile:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleEditing = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const EditingButtons = () => (
    <>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
        aria-label='Save Profile'
      >
        Save
      </button>
      <button
        type='button'
        onClick={toggleEditing}
        className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600'
        aria-label='Cancel Editing'
      >
        Cancel
      </button>
    </>
  );

  const EditButton = () => (
    <button
      type='button'
      onClick={(e) => {
        e.preventDefault();
        setIsEditing(true);
      }}
      className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
      aria-label='Edit Profile'
    >
      Edit Profile
    </button>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSave)}>
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
            {isEditing ? <EditingButtons /> : <EditButton />}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default YourProfilePage;
