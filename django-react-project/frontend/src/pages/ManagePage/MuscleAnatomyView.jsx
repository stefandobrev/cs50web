import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToggleButton } from '../../components/Buttons/EditButtons';
import FrontAnatomy from '../../components/Anatomy/FrontAnatomy';
import BackAnatomy from '../../components/Anatomy/BackAnatomy';

const MuscleAnatomyView = ({ className = '' }) => {
  const [muscleView, setMuscleView] = useState('front');

  const toggleMuscleView = () => {
    setMuscleView((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <ToggleButton
        onClick={toggleMuscleView}
        variant={muscleView === 'front' ? 'green' : 'blue'}
      >
        {muscleView === 'front' ? 'Show back' : 'Show front'}
      </ToggleButton>

      <AnimatePresence mode='wait'>
        {muscleView === 'front' ? (
          <motion.div
            key='front'
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
            key='back'
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
