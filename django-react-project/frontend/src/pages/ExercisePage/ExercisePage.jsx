import FrontAnatomy from '../../assets/FrontAnatomy';
import BackAnatomy from '../../assets/BackAnatomy';

export const ExercisePage = () => {
  return (
    <div className='anatomy-images'>
      <div className='lg:w-1/3'>
        <FrontAnatomy />
      </div>
      <div className='lg:w-1/3'>
        <BackAnatomy />
      </div>
    </div>
  );
};
