import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const DropdownFieldWithTags = ({ label, id, options, placeholder = '--' }) => {
  const {
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setSelectedTags([]);
  }, [isSubmitSuccessful]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue && !selectedTags.includes(selectedValue)) {
      setSelectedTags((prev) => [...prev, selectedValue]);
      setValue(id, [...selectedTags, selectedValue]); // Update form state
    }

    // Reset dropdown value after selection
    event.target.value = '';
  };

  const handleTagRemove = (tag) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
    setValue(id, updatedTags); // Update form state
  };

  useEffect(() => {
    setSelectedTags([]);
    setValue(id, []);
  }, [id]);

  return (
    <div>
      <label htmlFor={id} className='block text-lg font-semibold'>
        {label}:
      </label>
      <select
        id={id}
        onChange={handleSelectChange}
        className='border border-gray-300 p-2 rounded w-full mb-2'
      >
        <option value=''>{placeholder}</option>
        {options.map((option) => (
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
              className='text-black  hover:text-red-500 ml-2'
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      {errors[id] && <p className='text-red-500'>{errors[id].message}</p>}
    </div>
  );
};

export default DropdownFieldWithTags;
