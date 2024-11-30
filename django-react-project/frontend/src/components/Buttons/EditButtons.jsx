const EditButtons = ({
  isEditing,
  setIsEditing,
  onCancel,
  isDisabled = false,
}) => {
  const toggleEditing = (e) => {
    e.preventDefault();
    onCancel ? onCancel() : setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className='flex space-x-4'>
        <button
          type='submit'
          disabled={isDisabled}
          className={`${
            isDisabled ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          } text-white px-4 py-2 rounded-md`}
          aria-label='Save Changes'
        >
          Save
        </button>
        <button
          type='button'
          onClick={toggleEditing}
          className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600'
          aria-label='Cancel Editing'
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type='button'
      onClick={(e) => {
        e.preventDefault();
        setIsEditing(true);
      }}
      className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
      aria-label='Edit'
    >
      Edit
    </button>
  );
};

export default EditButtons;
