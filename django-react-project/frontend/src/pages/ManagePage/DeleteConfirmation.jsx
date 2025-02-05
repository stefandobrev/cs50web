import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

import {
  DeleteButton,
  CancelButton,
} from '../../components/Buttons/EditButtons';

const DeleteConfirmation = ({ onClose, onConfirm, title }) => {
  return (
    <Dialog open={true} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50'>
        <DialogPanel className='max-w-lg w-full bg-white border rounded-lg p-8 shadow-xl space-y-6 transform transition-all'>
          <DialogTitle className='text-2xl font-semibold text-gray-900'>
            Delete Exercise: {title}
          </DialogTitle>
          <p className='text-lg text-gray-700'>
            Are you sure you want to delete the exercise?
          </p>
          <div className='flex gap-4 justify-end'>
            <CancelButton onClick={onClose} />
            <DeleteButton
              onClick={() => {
                onConfirm();
                onClose();
              }}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmation;
