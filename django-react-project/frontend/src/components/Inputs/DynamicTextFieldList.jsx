import { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const DynamicTextFieldList = ({ labelPrefix = 'Item' }) => {
  const [fields, setFields] = useState([]);
  const {
    control,
    unregister,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  useEffect(() => {
    setFields([]);
  }, [isSubmitSuccessful]);

  const singularize = (word) => {
    if (word.toLowerCase().endsWith('s')) {
      return word.slice(0, -1);
    }
    return word;
  };

  const handleAddField = () => {
    const newIndex = fields.length;
    setFields([...fields, '']);
    setValue(`${labelPrefix.toLowerCase()}[${newIndex}]`, '');
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
    setValue(`${labelPrefix.toLowerCase()}[${index}]`, value);
  };

  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);

    fields.forEach((_, i) => unregister(`${labelPrefix.toLowerCase()}[${i}]`));
    updatedFields.forEach((value, i) =>
      setValue(`${labelPrefix.toLowerCase()}[${i}]`, value)
    );
  };

  const autoResize = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div className='space-y-3'>
      {fields.map((fieldValue, index) => (
        <div key={index} className='block text-lg font-semibold'>
          <label>{`${singularize(labelPrefix)} ${index + 1}`}</label>
          <div className='flex items-center space-x-2 font-normal'>
            <Controller
              name={`${labelPrefix.toLowerCase()}[${index}]`}
              control={control}
              defaultValue={fieldValue}
              render={({ field }) => (
                <textarea
                  {...field}
                  value={fieldValue}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  onInput={autoResize}
                  className='border border-gray-300 p-2 rounded w-full resize-none overflow-hidden'
                  rows={1}
                />
              )}
            />
            <button
              type='button'
              onClick={() => handleRemoveField(index)}
              className='text-red-500 hover:text-red-700'
            >
              &times;
            </button>
          </div>
        </div>
      ))}
      <button
        type='button'
        onClick={handleAddField}
        className='bg-orange-500 text-white py-1 px-3 rounded w-full md:w-auto'
      >
        Add {singularize(labelPrefix)}
      </button>
    </div>
  );
};

export default DynamicTextFieldList;
