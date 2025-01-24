import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import InputField from '../../components/Inputs/InputField';
import DropdownField from '../../components/Inputs/DropdownField';
import DropdownFieldWithTags from '../../components/Inputs/DropdownWithTagsField';
import DynamicTextFieldList from '../../components/Inputs/DynamicTextFieldList';
import { SaveButton } from '../../components/Buttons/EditButtons';

export const DefaultForm = ({
  submittedExerciseData,
  muscleGroups,
  message,
  mode = 'add',
  exerciseData,
}) => {
  const { handleSubmit, register, watch, setValue } = useFormContext();
  const [selectedPrimaryGroup, setSelectedPrimaryGroup] = useState('');

  const handlePrimaryGroupChange = (event) => {
    setSelectedPrimaryGroup(event.target.value);
  };

  const filteredMuscleGroups = muscleGroups.filter(
    (group) => group.value !== selectedPrimaryGroup
  );

  useEffect(() => {
    if (exerciseData) {
      setValue('title', exerciseData.title);
      setValue('primary_group', exerciseData.primary_group);
      setValue(
        'secondary_group',
        exerciseData.secondary_group ? [...exerciseData.secondary_group] : []
      );

      setValue(
        'steps',
        exerciseData.steps.map((step) => step.description)
      );
    }
  }, [exerciseData, setValue]);

  const gifFront = watch('gif_link_front');
  const gifSide = watch('gif_link_side');

  const areUrlsInvalid = gifFront && gifSide && gifFront === gifSide;

  return (
    <form
      onSubmit={handleSubmit(submittedExerciseData)}
      className='flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg space-y-3'
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
        <InputField label='Gif Front' id='gif_link_front' type='url' required />
        <InputField label='Gif Side' id='gif_link_side' type='url' required />
        <InputField label='Video' id='video_link' type='url' required />
      </div>
      <DynamicTextFieldList labelPrefix='Mistakes' />

      <div className='flex justify-center'>
        {areUrlsInvalid && (
          <p className='text-red-500'>Gif links shouldn't be the same</p>
        )}

        {message && <p className={'text-red-500'}>{message.text}</p>}
      </div>

      <div className='flex flex-col justify-center items-center space-y-2'>
        <SaveButton disabled={areUrlsInvalid} className='w-full md:w-auto'>
          {mode === 'add' ? 'Add Exercise' : 'Edit Exercise'}
        </SaveButton>
      </div>
    </form>
  );
};
