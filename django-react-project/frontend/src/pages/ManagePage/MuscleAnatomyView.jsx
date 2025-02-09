import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToggleButton } from '../../components/Buttons/EditButtons';
import FrontAnatomy from '../../components/Anatomy/FrontAnatomy';
import BackAnatomy from '../../components/Anatomy/BackAnatomy';

const MuscleAnatomyView = ({ handleMuscleClick, selectedMuscle }) => {
  const [isFrontView, setIsFrontView] = useState('yes');

  const toggleIsFrontView = () => {
    setIsFrontView((prev) => (prev === 'yes' ? 'no' : 'yes'));
  };

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <ToggleButton onClick={toggleIsFrontView}>
        {isFrontView === 'yes' ? 'Show Back' : 'Show Front'}
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
            <FrontAnatomy
              onMuscleClick={handleMuscleClick}
              selectedMuscle={selectedMuscle}
            />
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
            <BackAnatomy
              onMuscleClick={handleMuscleClick}
              selectedMuscle={selectedMuscle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MuscleAnatomyView;
