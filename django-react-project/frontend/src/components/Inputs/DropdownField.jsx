import { useFormContext } from 'react-hook-form';

const DropdownField = ({
  label,
  id,
  options,
  required = true,
  placeholder = '--',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className='block text-lg font-semibold mb-2'>
        {label}:
        <select
          id={id}
          {...register(id, { required })}
          className='block border border-gray-300 p-2 rounded  w-full'
        >
          <option value=''>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {errors && errors[id] && (
        <p className='text-red-500'>{errors[id].message}</p>
      )}
    </div>
  );
};
export default DropdownField;
