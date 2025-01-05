import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { registerUser } from './helpersRegistration';
import PageTitle from '../../components/PageTitle';
import RegistrationForm from './RegistrationForm';
import sharedResolver from '../../utils/sharedResolver';

export const RegistrationPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const methods = useForm({
    resolver: sharedResolver,
  });

  const onSubmit = async (userData) => {
    const { type, text } = await registerUser(userData);

    if (type === 'error') {
      setMessage({ type, text });
      return;
    }

    if (type === 'success') {
      toast.success(text);
      navigate('/login');
    }
  };

  return (
    <div className='flex items-center justify-center h-full'>
      <PageTitle title='Create Profile' />
      <div className='bg-white p-5 rounded shadow-md w-full max-w-sm mx-4'>
        <h2 className='text-2xl font-semibold text-center mb-3'>
          Create Profile
        </h2>
        <FormProvider {...methods}>
          <RegistrationForm registerUser={onSubmit} message={message} />
        </FormProvider>
      </div>
    </div>
  );
};
