import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { EditButton } from '../Buttons/EditButtons';

const DynamicTextFieldList = ({
  labelPrefix = 'Item',
  textAreaRefs,
  autoResize,
}) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: labelPrefix.toLowerCase(),
  });

  const singularize = (word) => {
    if (word.toLowerCase().endsWith('s')) {
      return word.slice(0, -1);
    }
    return word;
  };

  return (
    <div className='space-y-3'>
      {fields.map((fieldValue, index) => (
        <div key={fieldValue.id} className='block text-lg font-semibold'>
          <label>{`${singularize(labelPrefix)} ${index + 1}`}</label>
          <div className='flex items-center space-x-2 font-normal'>
            <Controller
              name={`${labelPrefix.toLowerCase()}[${index}]`}
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  ref={(el) => (textAreaRefs.current[index] = el)}
                  onInput={autoResize}
                  className='border border-gray-300 p-2 rounded w-full resize-none overflow-hidden'
                  rows={1}
                />
              )}
            />
            <button
              type='button'
              onClick={() => remove(index)}
              className='text-red-500 hover:text-red-700'
            >
              &times;
            </button>
          </div>
        </div>
      ))}
      <EditButton
        onClick={() => append('')}
        variant='orange'
        className='w-full md:w-auto'
      >
        Add {singularize(labelPrefix)}
      </EditButton>
    </div>
  );
};

export default DynamicTextFieldList;
