import {
  SaveButton,
  DeleteButton,
  ViewButton,
} from '../../components/Buttons/EditButtons';

export const MdScreenButtons = ({ mode, hasChanges, areUrlsInvalid }) => (
  <div className='mt-4 bg-white py-2 flex flex-col md:flex-row justify-center gap-2 sticky bottom-0'>
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
      <div className='flex justify-center gap-2 mt-2 md:mt-0 w-full md:w-auto'>
        <DeleteButton className='w-full md:w-auto'>
          Delete Exercise
        </DeleteButton>
        <ViewButton className='w-full md:w-auto'>View Exercise</ViewButton>
      </div>
    )}
  </div>
);

export const SmScreenButtons = ({ mode, hasChanges, areUrlsInvalid }) => (
  <>
    <div className='mt-4 bg-white py-2 flex justify-center sticky bottom-0'>
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
    {mode === 'edit' && (
      <div className='mt-4 flex justify-center gap-2'>
        <DeleteButton className='w-full md:w-auto'>
          Delete Exercise
        </DeleteButton>
        <ViewButton className='w-full md:w-auto'>View Exercise</ViewButton>
      </div>
    )}
  </>
);
