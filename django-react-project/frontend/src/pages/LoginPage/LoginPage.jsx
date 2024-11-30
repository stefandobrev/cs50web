import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from './helpers';
import PageTitle from '../../components/PageTitle';
import LoginForm from '../../components/LoginForm';
import { setUser } from '../../store/slices/authSlice';
import { setLoading } from '../../store/slices/loadingSlice';

export const LoginPage = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (userData) => {
    dispatch(setLoading(true));
    try {
      const responseLoginUser = await loginUser(userData);

      if (responseLoginUser.type === 'error') {
        toast.error('Invalid credentials');
        return;
      }

      console.log('responseLoginUser:', responseLoginUser);
      dispatch(
        setUser({
          isAuthenticated: true,
          user: responseLoginUser.user,
          accessToken: responseLoginUser.tokens.access,
          refreshToken: responseLoginUser.tokens.refresh,
        })
      );

      toast.success('User logged in successfully!');
      navigate('/exercises');
    } catch (error) {
      toast.error('Login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='flex items-center justify-center h-full'>
      <PageTitle title='Member Login' />
      <div className='bg-white p-5 rounded shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-semibold text-center mb-3'>
          Member Login
        </h2>
        <FormProvider {...methods}>
          <LoginForm loginUserData={onSubmit} />
        </FormProvider>
      </div>
    </div>
  );
};
