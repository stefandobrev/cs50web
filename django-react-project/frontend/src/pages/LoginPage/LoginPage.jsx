import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from './helpersLogin';
import PageTitle from '../../components/PageTitle';
import LoginForm from './LoginForm';
import { setUser } from '../../store/slices/authSlice';
import { setLoading } from '../../store/slices/loadingSlice';

export const LoginPage = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (userData) => {
    dispatch(setLoading(true));
    const { type, text } = await loginUser(userData);

    if (type === 'error') {
      toast.error(text);
      dispatch(setLoading(false));
      return;
    }

    const data = text;
    dispatch(
      setUser({
        isAuthenticated: true,
        user: {
          username: data.username,
        },
        accessToken: data.access,
        refreshToken: data.refresh,
      }),
    );

    toast.success('User logged in successfully!');
    navigate('/exercises');
    dispatch(setLoading(false));
  };

  return (
    <div className='flex h-full items-center justify-center'>
      <PageTitle title='Member Login' />
      <div className='w-full max-w-sm rounded bg-white p-5 shadow-md'>
        <h2 className='mb-3 text-center text-2xl font-semibold'>
          Member Login
        </h2>
        <FormProvider {...methods}>
          <LoginForm loginUserData={onSubmit} />
        </FormProvider>
      </div>
    </div>
  );
};
