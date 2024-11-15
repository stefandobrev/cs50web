import { FormProvider, useForm } from 'react-hook-form';

import PageTitle from '../components/PageTitle';
import { loginUser } from '../services/services';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (userData) => {
    try {
      const responseLoginUser = await loginUser(userData);
      console.log('Response data:', responseLoginUser);
      setIsAuthenticated(true);
      navigate('/exercises');
    } catch (error) {
      'Login error:', error;
    }
  };

  return (
    <section className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <PageTitle title='Member Login | AlishFitness' />
      <h2 className='text-3xl font-semibold text-center mb-6'>Member Login</h2>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <FormProvider {...methods}>
          <LoginForm loginUserData={onSubmit} />
        </FormProvider>
      </div>
    </section>
  );
};
export default LoginPage;
