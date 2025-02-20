import { useRef, useEffect } from 'react';

export const MuscleTile = ({ exercise }) => {
  const tileRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const tile = tileRef.current;
    const video = videoRef.current;

    const handleMouseEnter = () => {
      if (video) {
        video.play();
      }
    };

    const handleMouseLeave = () => {
      if (video) {
        video.pause();
      }
    };

    if (tile) {
      tile.addEventListener('mouseenter', handleMouseEnter);
      tile.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (tile) {
        tile.removeEventListener('mouseenter', handleMouseEnter);
        tile.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      key={exercise.id}
      className='group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800'
      ref={tileRef}
    >
      <div className='p-4 pb-2'>
        <h2 className='flex justify-center text-lg font-semibold text-gray-800 dark:text-white'>
          {exercise.title}
        </h2>
      </div>
      <div className='aspect-video overflow-hidden'>
        <video
          ref={videoRef}
          src={exercise.gif_link_front}
          className='h-full w-full object-cover'
          loop
          muted
          playsInline
        />
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-black/40 opacity-0 transition-opacity group-hover:opacity-100' />
    </div>
  );
};

export default MuscleTile;
