import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

const DropdownFieldWithTags = ({ label, id, options, placeholder = '--' }) => {
  const { control } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className='block text-lg font-semibold mb-2'>
        {label}:
      </label>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isMulti
            placeholder={placeholder}
            onChange={(selected) =>
              field.onChange(selected.map((opt) => opt.value))
            }
            value={options.filter((option) =>
              field.value?.includes(option.value)
            )}
            className='w-full'
          />
        )}
      />
    </div>
  );
};

export default DropdownFieldWithTags;
