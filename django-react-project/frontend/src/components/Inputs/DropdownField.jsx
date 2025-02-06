import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

const DropdownField = ({
  label,
  id,
  options,
  required = true,
  placeholder = '--',
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className='block text-lg font-semibold mb-2'>
        {label}:
      </label>
      <Controller
        name={id}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isClearable
            placeholder={placeholder}
            onChange={(selected) => field.onChange(selected?.value)}
            value={
              options.find((option) => option.value === field.value) || null
            }
            className='font-semibold w-full'
          />
        )}
      />
      {errors[id] && <p className='text-red-500'>{errors[id].message}</p>}
    </div>
  );
};

export default DropdownField;
