import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import PageTitle from '../components/PageTitle';
import { addUser } from '../services/services';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPage = () => {
  const [message, setMessage] = useState('');
  const methods = useForm();
  const { reset } = methods;

  const onSubmit = async (userData) => {
    const { password, confirm_password } = userData;
    if (password !== confirm_password) {
      return {
        type: 'error',
        text: "Passwords doesn't match!",
      };
    }

    console.log(userData);
    const { type, text } = await addUser(userData);
    if (type) {
      setMessage({ type, text });
    }

    if (type === 'success') {
      reset();
    }
  };

  return (
    <section className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <PageTitle title='Create Profile | ' />
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
