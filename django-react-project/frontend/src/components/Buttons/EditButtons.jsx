import Button from './Button';

export const EditButton = ({
  children = 'Edit',
  variant = 'green',
  onClick,
  disabled,
  className = '',
}) => (
  <Button
    type='button'
    onClick={onClick}
    variant={variant}
    disabled={disabled}
    className={className}
    aria-label='Edit'
  >
    {children}
  </Button>
);

export const ToggleButton = ({
  children = 'Toggle',
  variant = 'blue',
  onClick,
  disabled,
  className = '',
}) => (
  <Button
    type='button'
    onClick={onClick}
    variant={variant}
    disabled={disabled}
    className={className}
    aria-label='Toggle'
  >
    {children}
  </Button>
);

export const SaveButton = ({
  children = 'Save',
  disabled,
  className = '',
  ...props
}) => (
  <Button
    type='submit'
    disabled={disabled}
    variant='blue'
    className={className}
    aria-label='Save Changes'
    {...props}
  >
    {children}
  </Button>
);

export const CancelButton = ({ children = 'Cancel', onClick }) => (
  <Button
    type='button'
    onClick={onClick}
    variant='gray'
    aria-label='Cancel Editing'
  >
    {children}
  </Button>
);

export const DeleteButton = ({ children = 'Delete', onClick }) => (
  <Button type='button' onClick={onClick} variant='red' aria-label='Delete'>
    {children}
  </Button>
);
