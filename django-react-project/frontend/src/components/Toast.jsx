import { ToastContainer } from 'react-toastify';

const Toast = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={3000} // Closes after 3 seconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='colored' // Options: light, dark, colored
    />
  );
};
export default Toast;
