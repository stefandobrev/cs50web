import {
  SaveButton,
  DeleteButton,
  ViewButton,
} from '../../components/buttons/EditButtons';

const ExerciseButtons = ({
  mode,
  hasChanges,
  areUrlsInvalid,
  handleDeleteButton,
  handleViewButton,
  containerClass,
}) => (
  <div className={containerClass}>
    <SaveButton
      disabled={
        mode === 'edit' ? !hasChanges || areUrlsInvalid : areUrlsInvalid
      }
      form='exercise-form'
      className='w-full md:w-auto'
    >
      {mode === 'add' ? 'Add Exercise' : 'Edit Exercise'}
    </SaveButton>
    {mode === 'edit' && (
      <div className='mt-2 flex w-full justify-center gap-2 md:mt-0 md:w-auto'>
        <DeleteButton
          onClick={handleDeleteButton}
          variant='grayDark'
          className='w-full md:w-auto'
        >
          Delete Exercise
        </DeleteButton>
        <ViewButton onClick={handleViewButton} className='w-full md:w-auto'>
          View Exercise
        </ViewButton>
      </div>
    )}
  </div>
);

export const MdScreenButtons = (props) => (
  <ExerciseButtons
    {...props}
    containerClass='sticky bottom-0 mt-4 flex flex-col justify-center gap-2 bg-white py-2 md:flex-row'
  />
);

export const SmScreenButtons = (props) => (
  <ExerciseButtons
    {...props}
    containerClass='sticky bottom-0 mt-4 flex justify-center bg-white py-2'
  />
);
