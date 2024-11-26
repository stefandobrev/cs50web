import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import PageTitle from '../../components/PageTitle';
import RegistrationForm from '../../components/RegistrationForm';
import registrationResolver from './registrationResolver';
import { addUser } from './helpers';

const RegistrationPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const methods = useForm({
    resolver: registrationResolver,
  });

  const onSubmit = async (userData) => {
    const { type, text } = await addUser(userData);

    if (type === 'error') {
      setMessage({ type, text });
      return;
    }

    if (type === 'success') {
      toast.success('User created successfully!');
      navigate('/login');
    }
  };

  return (
    <section className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <PageTitle title='Create Profile | AlishFitness' />
      <h2 className='text-3xl font-semibold text-center mb-6'>
        Create Profile
      </h2>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <FormProvider {...methods}>
          <RegistrationForm registerUser={onSubmit} message={message} />
        </FormProvider>
      </div>
    </section>
  );
};

export default RegistrationPage;
