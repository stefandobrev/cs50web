import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import InputField from '../../components/Inputs/InputField';
import DropdownField from '../../components/Inputs/DropdownField';
import DropdownFieldWithTags from '../../components/Inputs/DropdownWithTagsField';
import DynamicTextFieldList from '../../components/Inputs/DynamicTextFieldList';

const ManageForm = ({ exerciseData, muscleGroups, message }) => {
  const { handleSubmit, register } = useFormContext();
  const [selectedPrimaryGroup, setSelectedPrimaryGroup] = useState('');

  const handlePrimaryGroupChange = (event) => {
    setSelectedPrimaryGroup(event.target.value);
  };

  const filteredMuscleGroups = muscleGroups.filter(
    (group) => group.value !== selectedPrimaryGroup
  );

  return (
    <form onSubmit={handleSubmit(exerciseData)} className='space-y-3'>
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
      <DynamicTextFieldList labelPrefix='Step' />
      <InputField label='Gif Front' id='gif_link_front' type='url' required />
      <InputField label='Gif Side' id='gif_link_side' type='url' required />
      <InputField label='Video' id='video_link' type='url' required />
      <DynamicTextFieldList labelPrefix='Mistake' />
      <div className='flex flex-col justify-center items-center space-y-2'>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded w-auto'
        >
          Add Exercise
        </button>
      </div>
    </form>
  );
};
export default ManageForm;
