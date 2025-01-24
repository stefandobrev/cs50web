import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { EditButton } from '../Buttons/EditButtons';

const DynamicTextFieldList = ({ labelPrefix = 'Item' }) => {
  const { control, setValue, unregister } = useFormContext();

  const fields = useWatch({
    control,
    name: labelPrefix.toLowerCase(),
    defaultValue: [],
  });

  const singularize = (word) => {
    if (word.toLowerCase().endsWith('s')) {
      return word.slice(0, -1);
    }
    return word;
  };

  const handleAddField = () => {
    const newFields = [...fields, ''];
    setValue(labelPrefix.toLowerCase(), newFields);
  };

  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    updatedFields.forEach((value, i) => {
      setValue(`${labelPrefix.toLowerCase()}[${i}]`, value);
    });

    const totalFields = fields.length;
    for (let i = updatedFields.length; i < totalFields; i++) {
      unregister(`${labelPrefix.toLowerCase()}[${i}]`);
    }
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
              defaultValue={fieldValue || ''}
              render={({ field }) => (
                <textarea
                  {...field}
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
      <EditButton
        onClick={handleAddField}
        variant='orange'
        className='w-full md:w-auto'
      >
        Add {singularize(labelPrefix)}
      </EditButton>
    </div>
  );
};

export default DynamicTextFieldList;
