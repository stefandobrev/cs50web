import Button from './Button';

export const EditButton = ({ onClick, disabled }) => (
  <Button
    type='button'
    onClick={onClick}
    variant='success'
    disabled={disabled}
    aria-label='Edit'
  >
    Edit
  </Button>
);

export const SaveButton = ({ disabled }) => (
  <Button
    type='submit'
    disabled={disabled}
    variant='primary'
    aria-label='Save Changes'
  >
    Save
  </Button>
);

export const CancelButton = ({ onClick }) => (
  <Button
    type='button'
    onClick={onClick}
    variant='secondary'
    aria-label='Cancel Editing'
  >
    Cancel
  </Button>
);

export const EditButtonGroup = ({
  isEditing,
  setIsEditing,
  onCancel,
  isDisabled,
}) => {
  const handleCancel = (e) => {
    e.preventDefault();
    onCancel ? onCancel() : setIsEditing(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return isEditing ? (
    <div className='flex space-x-4'>
      <SaveButton disabled={isDisabled} />
      <CancelButton onClick={handleCancel} />
    </div>
  ) : (
    <EditButton onClick={handleEdit} />
  );
};
