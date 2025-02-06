import { useFormContext } from 'react-hook-form';

const InputField = ({ label, id, type = 'text', required = true, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className='block text-lg font-semibold'>
        {label}:
      </label>
      <div className='relative'>
        <input
          id={id}
          type={type}
          {...register(id, { required })}
          className='flex border border-gray-300 p-2 rounded w-full'
          {...rest}
        />
      </div>

      {errors && errors[id] && (
        <p className='text-red-500'>{errors[id].message}</p>
      )}
    </div>
  );
};
export default InputField;
