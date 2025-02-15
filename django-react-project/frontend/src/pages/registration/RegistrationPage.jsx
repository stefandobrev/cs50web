import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { registerUser } from './helpersRegistration';
import PageTitle from '../../components/PageTitle';
import RegistrationForm from './RegistrationForm';
import userValidationResolver from '../../utils/userValidationResolver';

export const RegistrationPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const methods = useForm({
    resolver: userValidationResolver,
    context: 'registration',
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
    <div className='flex h-full items-center justify-center'>
      <PageTitle title='Create Profile' />
      <div className='mx-4 w-full max-w-sm rounded bg-white p-5 shadow-md'>
        <h2 className='mb-3 text-center text-2xl font-semibold'>
          Create Profile
        </h2>
        <FormProvider {...methods}>
          <RegistrationForm registerUser={onSubmit} message={message} />
        </FormProvider>
      </div>
    </div>
  );
};
