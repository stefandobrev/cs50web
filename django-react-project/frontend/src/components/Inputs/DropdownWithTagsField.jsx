import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const DropdownFieldWithTags = ({ label, id, options, placeholder = '--' }) => {
  const { setValue, control } = useFormContext();

  const selectedTags = useWatch({
    control,
    name: id,
    defaultValue: [],
  });

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue) {
      setValue(id, [...selectedTags, selectedValue]);
    }

    event.target.value = '';
  };

  const handleTagRemove = (tag) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setValue(id, updatedTags);
  };

  const filteredOptions = options.filter(
    (option) => !selectedTags.includes(option.value)
  );

  return (
    <div>
      <label htmlFor={id} className='block text-lg font-semibold mb-2'>
        {label}:
      </label>
      <select
        onChange={handleSelectChange}
        className='block border border-gray-300 p-2 rounded mb-2 w-full'
      >
        <option value=''>{placeholder}</option>
        {filteredOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Tag Display */}
      <div className='flex flex-wrap gap-2'>
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className='bg-gray-300 text-black font-semibold px-2 py-1 rounded flex items-center space-x-2'
          >
            <span>{options.find((o) => o.value === tag)?.label}</span>
            <button
              type='button'
              onClick={() => handleTagRemove(tag)}
              className='text-black hover:text-red-500 ml-2'
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DropdownFieldWithTags;
