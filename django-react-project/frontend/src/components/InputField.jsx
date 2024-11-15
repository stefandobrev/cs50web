const InputField = ({ label, id, type = 'text', register, required }) => {
  return (
    <div>
      <label htmlFor={id} className='block text-lg font-semibold'>
        {label}:
        <input
          id={id}
          type={type}
          {...register(id, { required })}
          className='border border-gray-300 p-2 rounded w-full'
        />
      </label>
    </div>
  );
};
export default InputField;
