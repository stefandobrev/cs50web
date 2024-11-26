import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const PasswordField = ({ label, id, required = true }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <label htmlFor={id} className='block text-lg font-semibold'>
        {label}:
        <div className='relative'>
          <input
            id={id}
            type={isPasswordVisible ? 'text' : 'password'}
            {...register(id, { required })}
            className='border border-gray-300 p-2 rounded w-full'
          />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
            tabIndex='-1'
          >
            {isPasswordVisible ? (
              <EyeSlashIcon className='h-5 w-5' />
            ) : (
              <EyeIcon className='h-5 w-5' />
            )}
          </button>
        </div>
      </label>
      {errors && errors[id] && (
        <p className='text-red-500'>{errors[id].message}</p>
      )}
    </div>
  );
};
export default PasswordField;
