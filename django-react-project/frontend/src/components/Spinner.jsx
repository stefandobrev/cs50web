import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = ({ loading }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <ClipLoader color='#4338ca' loading={loading} size={150} />
    </div>
  );
};
export default Spinner;
