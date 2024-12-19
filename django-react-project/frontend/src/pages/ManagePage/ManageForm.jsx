import { useFormContext } from 'react-hook-form';

import InputField from '../../components/Inputs/InputField';

const ManageForm = ({ exerciseData }) => {
  const { handleSubmit, register } = useFormContext();
  return (
    <form onSubmit={handleSubmit(exerciseData)} className='space-y-3'>
      <InputField label='Title' id='title' registration={register('title')} />
      <div className='flex flex-col justify-center items-center space-y-2'>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded w-auto'
        >
          Add
        </button>
      </div>
    </form>
  );
};
export default ManageForm;
