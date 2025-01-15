import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import InputField from '../../components/Inputs/InputField';
import DropdownField from '../../components/Inputs/DropdownField';
import DropdownFieldWithTags from '../../components/Inputs/DropdownWithTagsField';
import DynamicTextFieldList from '../../components/Inputs/DynamicTextFieldList';

const ManageForm = ({
  submittedExerciseData,
  muscleGroups,
  message,
  mode,
  selectedExercise,
}) => {
  const { handleSubmit, register, watch } = useFormContext();
  const [selectedPrimaryGroup, setSelectedPrimaryGroup] = useState('');

  const handlePrimaryGroupChange = (event) => {
    setSelectedPrimaryGroup(event.target.value);
  };

  const filteredMuscleGroups = muscleGroups.filter(
    (group) => group.value !== selectedPrimaryGroup
  );

  const gifFront = watch('gif_link_front');
  const gifSide = watch('gif_link_side');

  const areUrlsInvalid = gifFront && gifSide && gifFront === gifSide;

  return (
    <div className='flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg'>
      <h2 className='text-2xl font-semibold text-center mb-3'>
        {mode === 'add' ? 'Add Exercise' : 'Edit Exercise'}
      </h2>
      <form
        onSubmit={handleSubmit(submittedExerciseData)}
        className='space-y-3'
      >
        <InputField label='Title' id='title' registration={register('title')} />
        <DropdownField
          label='Primary Group'
          id='primary_group'
          options={muscleGroups}
          placeholder='Select primary group'
          onChange={handlePrimaryGroupChange}
        />
        <DropdownFieldWithTags
          label='Secondary Group'
          id='secondary_group'
          options={filteredMuscleGroups}
          key={selectedPrimaryGroup}
        />
        <DynamicTextFieldList labelPrefix='Steps' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <InputField
            label='Gif Front'
            id='gif_link_front'
            type='url'
            required
          />
          <InputField label='Gif Side' id='gif_link_side' type='url' required />
          <InputField label='Video' id='video_link' type='url' required />
        </div>
        <DynamicTextFieldList labelPrefix='Mistakes' />

        {areUrlsInvalid && (
          <p className='text-red-500'>Gif links shouldn't be the same</p>
        )}

        {message && <p className={'text-red-500'}>{message.text}</p>}

        <div className='flex flex-col justify-center items-center space-y-2'>
          <button
            type='submit'
            disabled={areUrlsInvalid}
            className='bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto'
          >
            Add Exercise
          </button>
        </div>
      </form>
    </div>
  );
};
export default ManageForm;
