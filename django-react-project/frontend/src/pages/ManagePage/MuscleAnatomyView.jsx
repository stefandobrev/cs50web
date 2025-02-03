import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToggleButton } from '../../components/Buttons/EditButtons';
import FrontAnatomy from '../../components/Anatomy/FrontAnatomy';
import BackAnatomy from '../../components/Anatomy/BackAnatomy';

const MuscleAnatomyView = () => {
  const [isFrontView, setIsFrontView] = useState('yes');

  const toggleIsFrontView = () => {
    setIsFrontView((prev) => (prev === 'yes' ? 'no' : 'yes'));
  };

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <ToggleButton
        onClick={toggleIsFrontView}
        variant={isFrontView === 'yes' ? 'green' : 'blue'}
      >
        {isFrontView === 'yes' ? 'Show back' : 'Show front'}
      </ToggleButton>

      <AnimatePresence mode='wait'>
        {isFrontView === 'yes' ? (
          <motion.div
            key='yes'
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='w-full'
          >
            <FrontAnatomy />
          </motion.div>
        ) : (
          <motion.div
            key='no'
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='w-full'
          >
            <BackAnatomy />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MuscleAnatomyView;
