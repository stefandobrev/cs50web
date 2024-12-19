import { FormProvider, useForm } from 'react-hook-form';

import PageTitle from '../../components/PageTitle';
import ManageForm from './ManageForm';

export const ManagePage = () => {
  const methods = useForm();

  const onSubmit = async (exerciseData) => {
    console.log(exerciseData);
  };
  return (
    <div className='flex items-center justify-center h-full'>
      <PageTitle title='Manage' />
      <div className='bg-white p-5 rounded shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-semibold text-center mb-3'>
          Manage Exercises
        </h2>
        <FormProvider {...methods}>
          <ManageForm exerciseData={onSubmit} />
        </FormProvider>
      </div>
    </div>
  );
};
