import { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import InputField from '../../components/Inputs/InputField';
import DropdownField from '../../components/Inputs/DropdownField';
import DropdownFieldWithTags from '../../components/Inputs/DropdownWithTagsField';
import DynamicTextFieldList from '../../components/Inputs/DynamicTextFieldList';
import { MdScreenButtons, SmScreenButtons } from './DefaultFormButtons';

export const DefaultForm = ({
  submittedExerciseData,
  muscleGroups,
  message,
  mode = 'add',
  title,
  exerciseData,
  hasChanges,
  handleDeleteButton,
}) => {
  const { handleSubmit, register, watch, setValue } = useFormContext();
  const textAreaRefs = useRef([]);
  const exerciseDataRef = useRef(exerciseData);
  const [isMdScreen, setIsMdScreen] = useState(false);

  const primaryGroupValue = watch('primary_group');

  useEffect(() => {
    if (exerciseDataRef.current?.primary_group !== primaryGroupValue) {
      setValue('secondary_group', []);
    }
  }, [primaryGroupValue, setValue]);

  const filteredMuscleGroups = muscleGroups.filter(
    (group) => group.value !== primaryGroupValue
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

  /* Cosmetic changes */
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

  useEffect(() => {
    const handleResize = () => setIsMdScreen(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg'>
      {title}

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
        />
        <DropdownFieldWithTags
          label='Secondary Group'
          id='secondary_group'
          options={filteredMuscleGroups}
          key={primaryGroupValue}
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

      {isMdScreen ? (
        <MdScreenButtons
          mode={mode}
          hasChanges={hasChanges}
          areUrlsInvalid={areUrlsInvalid}
          handleDeleteButton={handleDeleteButton}
        />
      ) : (
        <SmScreenButtons
          mode={mode}
          hasChanges={hasChanges}
          areUrlsInvalid={areUrlsInvalid}
          handleDeleteButton={handleDeleteButton}
        />
      )}
    </div>
  );
};
