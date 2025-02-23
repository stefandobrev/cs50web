import { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MuscleTile = ({ exercise }) => {
  const tileRef = useRef(null);
  const videoRef = useRef(null);
  const observerRef = useRef(null);
  const navigate = useNavigate();
  const { muscleGroupId } = useParams();

  const exerciseId = exercise.id;

  useEffect(() => {
    const tile = tileRef.current;
    const video = videoRef.current;
    if (!tile || !video) return;

    const isTouchDevice = 'ontouchstart' in window;
    const hasHover = window.matchMedia('(hover: hover)').matches;

    const cleanup = () => {
      video.pause();
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };

    if (isTouchDevice) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.4,
        },
      );

      observerRef.current.observe(tile);
    } else if (hasHover) {
      const handleMouseEnter = () => video.play();
      const handleMouseLeave = () => video.pause();

      tile.addEventListener('mouseenter', handleMouseEnter);
      tile.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        tile.removeEventListener('mouseenter', handleMouseEnter);
        tile.removeEventListener('mouseleave', handleMouseLeave);
        cleanup();
      };
    }

    return () => cleanup();
  }, []);

  const handleTileClick = () => {
    navigate(`/exercises/${muscleGroupId}/${exerciseId}`);
  };

  return (
    <div
      key={exerciseId}
      className='group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800'
      ref={tileRef}
      onClick={handleTileClick}
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
