import { useState, useEffect, useRef } from 'react';
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
  title,
  exerciseData,
  hasChanges,
}) => {
  const { handleSubmit, register, watch, setValue } = useFormContext();
  const [selectedPrimaryGroup, setSelectedPrimaryGroup] = useState('');
  const textAreaRefs = useRef([]);
  const exerciseDataRef = useRef(exerciseData);

  const handlePrimaryGroupChange = (event) => {
    setSelectedPrimaryGroup(event.target.value);
  };

  const filteredMuscleGroups = muscleGroups.filter(
    (group) => group.value !== selectedPrimaryGroup
  );

  useEffect(() => {
    if (exerciseData) {
      setValue('id', exerciseData.id);
      setValue('title', exerciseData.title);
      setValue('primary_group', exerciseData.primary_group);
      setValue('secondary_group', exerciseData.secondary_group);
      setValue('steps', exerciseData.steps);
      setValue('gif_link_front', exerciseData.gif_link_front);
      setValue('gif_link_side', exerciseData.gif_link_side);
      setValue('video_link', exerciseData.video_link);
      setValue('mistakes', exerciseData.mistakes);

      exerciseDataRef.current = exerciseData;
    }
  }, [exerciseData, setValue]);

  const autoResize = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  useEffect(() => {
    if (exerciseDataRef.current) {
      textAreaRefs.current.forEach((textarea) => {
        if (textarea) {
          autoResize({ target: textarea });
        }
      });
    }
  }, [exerciseDataRef.current]);

  const gifFront = watch('gif_link_front');
  const gifSide = watch('gif_link_side');

  const areUrlsInvalid = gifFront && gifSide && gifFront === gifSide;

  return (
    <div className='flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg'>
      <h2 className='text-2xl font-semibold text-center mb-3 sticky top-0 bg-white z-10'>
        {title}
      </h2>

      <form
        id='exercise-form'
        onSubmit={handleSubmit(submittedExerciseData)}
        className='flex flex-col space-y-3 overflow-y-auto lg:max-h-[67vh] px-2'
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
        <DynamicTextFieldList
          labelPrefix='Steps'
          textAreaRefs={textAreaRefs}
          autoResize={autoResize}
        />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <InputField
            label='Gif Front'
            id='gif_link_front'
            type='url'
            required
          />
          <InputField label='Gif Side' id='gif_link_side' type='url' required />
          <InputField label='Video' id='video_link' type='url' required />
        </div>
        <DynamicTextFieldList
          labelPrefix='Mistakes'
          textAreaRefs={textAreaRefs}
          autoResize={autoResize}
        />
        {areUrlsInvalid && (
          <p className='text-red-500'>Gif links shouldn't be the same</p>
        )}
        {message && <p className='text-red-500'>{message.text}</p>}
      </form>

      <div className='mt-4 flex justify-center sticky bottom-0 bg-white py-2'>
        <SaveButton
          disabled={
            mode === 'edit' ? !hasChanges || areUrlsInvalid : areUrlsInvalid
          }
          form='exercise-form'
          className='w-full md:w-auto'
        >
          {mode === 'add' ? 'Add Exercise' : 'Edit Exercise'}
        </SaveButton>
      </div>
    </div>
  );
};
