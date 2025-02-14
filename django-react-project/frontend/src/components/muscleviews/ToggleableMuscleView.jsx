import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToggleButton } from '../buttons/EditButtons';
import FrontAnatomy from '../anatomy/FrontAnatomy';
import BackAnatomy from '../anatomy/BackAnatomy';
import { frontMuscleGroupNames } from '../../common/constants';

const ToggleableMuscleView = ({
  handleMuscleClick,
  selectedPrimaryMuscle,
  selectedSecondaryMuscles,
}) => {
  const [isFrontView, setIsFrontView] = useState(true);

  useEffect(() => {
    setIsFrontView(
      !selectedPrimaryMuscle ||
        Object.values(frontMuscleGroupNames).includes(selectedPrimaryMuscle),
    );
  }, [selectedPrimaryMuscle]);

  const toggleIsFrontView = () => {
    setIsFrontView((prev) => !prev);
  };

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <ToggleButton onClick={toggleIsFrontView}>
        {isFrontView ? 'Show Back' : 'Show Front'}
      </ToggleButton>

      <AnimatePresence mode='wait'>
        {isFrontView ? (
          <motion.div
            key='front'
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='w-full'
          >
            <FrontAnatomy
              onMuscleClick={handleMuscleClick}
              selectedPrimaryMuscle={selectedPrimaryMuscle}
              selectedSecondaryMuscles={selectedSecondaryMuscles}
            />
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
            <BackAnatomy
              onMuscleClick={handleMuscleClick}
              selectedPrimaryMuscle={selectedPrimaryMuscle}
              selectedSecondaryMuscles={selectedSecondaryMuscles}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToggleableMuscleView;
