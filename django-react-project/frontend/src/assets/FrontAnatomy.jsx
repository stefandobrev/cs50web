import { useNavigate } from 'react-router-dom';

const FrontAnatomy = () => {
  const navigate = useNavigate();
  const handleMuscleGroupClick = (id) => {
    navigate(`/exercises/${id}`);
  };
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      id='front'
      width='100%'
      height='calc(100vh - 104px)'
      viewBox='0 0 1902.2 3121.67'
    >
      <path d='m1070.3 696.4 68.2 30.2 98.8 114.9 30.8 21.6-51.2 38.1-47.7 46-70.4 15.7-70.2-10.7-59.5-52.1-17.6-41.7V726.6l61.9-33.2zM831.6 696.4l-68.2 30.2-98.8 114.9-30.8 21.6 51.1 38.1 47.8 46 70.4 15.7 70.2-10.7 59.5-52.1 17.5-41.7V726.6l-61.9-33.2z' />
      <path d='M1241.9 994c-4.9 49.8-32.8 91.3-49.5 136.9-6.1 16.7-16.9 31.4-21.2 48.9-6 24.6-4.5 49.6.2 73.9 7.2 36.4 8.4 73.4 13.7 109.9 5.7 38.9 12.7 77.6 18.4 116.5 3.6 24.6 13.5 47.9 17.1 72.1 6.9 47.2 23.8 92.8 20.6 141.6-1.1 16.3 3 33 5.2 49.5 3.9 29.9 6 59.9 5 90-2 60.1-4.2 120.2-16.8 179.2-3.1 14.6-6.2 29.3-11.1 43.5-7.8 22.4-2.5 45.2.7 67.6 1.8 12.8 5.7 25.2 5.6 38.4-.3 28.5 13.5 53.3 22.2 79.3 8.2 24.5 12.7 49.4 14.6 75 3 41 2.8 82-.5 122.9-2.1 26.6-7.3 53-10.5 79.6-4.8 40.3-9.2 80.7-13.6 121-1.1 9.8.4 19.4 3.2 28.9 2.5 8.6 6.5 17.6 5.7 26-2.1 21.1 6.9 37 18.9 52.9 9.8 13 16.2 28.3 22 43.4 2.5 6.6 6.2 11 11.6 14.9 13.6 9.7 26 20.9 37.7 32.9 8.1 8.3 14 18.1 17.2 29.2 2.4 8.4 1.9 16.3-7.1 21-6.3 3.3-9.7 9.9-13.7 14.8-7.2 8.6-17.6 9-25.6 14.7-1.8 1.3-5.5 2.2-7 1.2-11.6-7.6-20.3 2.3-30.3 4.3-18.4 3.8-31.4-6.3-41.6-19.8-6.3-8.4-13.2-15.2-23.1-19.1-12.8-5-15.2-17.2-15.5-28.2-.3-12.1-7-17.4-15.6-22.4-7.4-4.2-15.2-8-20.7-14.8-5.7-7.1-7.9-14.6-7.3-24.6 1.4-19.8 5-39.6 3.3-59.5-.3-3.6-1.3-7.2-2.6-10.5-5.6-13.3-7.9-26.4-5.3-41.4 3-16.7-.5-33.9-1.6-51-2.8-42.2-9.3-83.7-22.1-124.1-7.7-24.3-14.4-48.9-28.8-70.6-11.9-18-14.5-38.2-11.4-59.6 5.7-39.3 10.9-78.6 15.6-118 2.1-17.3-2-33-13.1-47.7-22.3-29.4-38.7-62.4-43.8-99.2-3.4-24.4-3.6-49.1-8.6-73.5-6.6-32.5-13.7-65.1-16.4-98.1-2-24.7-18.4-42.2-24.3-64.7-9.8-37.5-27.2-72.9-31.7-112-1.2-10.4-3.3-20.9-3.4-31.3-.2-21.7-3.2-43.4-.8-65.1.4-3.5.1-5.3-3.9-5.6-4.5-.2-5.4 2-5.4 5.9 0 14.6-.3 29.3-.2 43.9.2 32.3-3.5 64.6-13.2 95-10.6 33.2-17.9 68.1-35.4 98.4-12.8 22.2-12.3 46.2-16.3 69.5-5.4 31.6-11.7 63.1-17.1 94.7-.5 2.8-1.1 5.7-.9 8.5 2.1 49.5-16.1 92.8-44.6 131.3-14.7 19.8-15 39.6-12.8 61.9 3.8 38.8 12.6 77 14.5 116 .9 18.8-2.5 36.4-13.5 52.1-13 18.6-19.1 40.4-25.8 61.6-17.8 56.1-25.8 114-25.2 172.8.2 18.7.7 36.4-6.5 54.7-4.3 10.9-2.2 25.1-.5 37.5 1.6 11 1.5 21.9 2.2 32.8 1.1 14.7-8.5 23.5-19.9 29.6-14.9 7.9-26.1 16.7-25.2 36.1.4 8.7-5.7 16.1-14.4 19.6-9.9 3.9-16.5 11.1-23 19.3-10.4 13.3-23.5 23.7-41.8 19.3-10-2.4-18.6-6-30.2-5.3-16.6 1-31.2-10.3-41.4-24.8-4.6-6.5-14.2-9.2-12.6-20.4 1.7-12.4 8-22 14.9-31.5.7-1 1.6-1.9 2.5-2.7 8-7.6 15.1-16.5 24.2-22.3 16.2-10.4 26.1-24.3 32.9-42 6-15.5 14.5-30.2 25.5-42.9 6-7 8.4-14.7 8-23.5-.7-12.3.7-24.4 4.8-36 7.6-21.6 3.5-43.4 1.1-65.1-3.9-35.5-8.7-70.8-13.2-106.2-3.4-27-9.5-53.7-9.5-81-.1-46.4-2.7-92.9 4.8-139 3.1-18.9 10.2-36.7 16.3-54.8 7.3-21.4 17.7-42.1 16.8-65.5-.7-18.6 6.6-35.8 8.4-54 2.6-25.9-2-50.6-8.6-75.6-10.2-38.1-16-77.1-18-116.5-2.2-43.8-5.2-87.7-2.6-131.6 1.6-26.8 4.4-53.4 9-79.9 2.1-12.3-2.4-24.4-.3-36.5 4.7-26.8 9.6-53.5 14.8-80.1 11.1-56.4 26.3-112.1 34.4-169.1 6.8-48.2 11.2-96.7 17.8-144.9 2.4-17.2 5.1-34.5 7.1-51.8 3.6-31.6-10.6-58.2-22.3-85.9-15.8-37.4-35.4-73.2-46.7-112.4-2.7-9.4-4-19.1-4.5-28.8-3.5-4-5.7-8.5-5.6-14 .4-1.3 1.1-2.5 2.1-3.5 3.5-2.9 7.2-4.1 11.6-2.2 6.9 5 6.6 13.3 6.8 20 .6 23.5 9.1 44.6 18.7 65.2 15 32.1 27.9 65.1 43 97.1 15.8 33.5 13.4 69 6.4 104.1-5.6 28-6.9 56.5-10.6 84.7-2.5 18.9 5 24.2 22.8 17.2 14.9-5.8 26.2-16.1 34-30.2 18.2-32.8 20.8-67 13.8-103.9-6.8-35.8-2.7-72.1 7.9-107.3 6.1-20.1 5.6-41 6.3-61.6.4-10.2-6.4-16.7-13.3-23.6-27.2-26.9-57.6-50.3-85.2-76.7-4.2-4-10-7.7-8.7-15.1.5-4.7 3.1-7.8 7.5-9.3 3.9-1.5 7 .5 10.2 2.3 60.3 33 118.5 26.9 172.5-13.3 25-18.6 40.8-44.7 39.8-78.4-1.2-40.6 1-81.2-1.3-121.8 1.8-4.3 4.3-7.9 9-9.4 2.3-.8 4.6-.7 6.8.3 4.7 2 5.8 6.8 7.8 10.7-1.3 43.5-.6 87.1-.5 130.7.1 26.5 14.9 46.7 33 63.2 24.5 22.5 54.2 33.9 88.1 37.7 33.1 3.7 61.9-4.8 89.9-20.2 3.7-2 7.4-3.5 11.6-1.3 4.1 2.5 4.6 6.9 5.4 11 .2 9.6-7.6 14.2-13.5 19.2-18.9 16.1-37.8 32.2-56.5 48.5-2.8 2.4-5.3 5.2-8.3 7.1-35 23-32.3 57.6-23.7 90.5 11.8 44.9 17.2 89.3 7.8 135-6.7 32.6 2.3 62.2 18.7 89.9 8.1 13.7 20.5 23.1 36 27.7 13.5 4.1 20.8-.9 18.8-14.5-4.3-29-4.5-58.4-10.7-87.2-7.7-35.6-10.2-71.7 5.6-105.4 15.4-32.8 28.3-66.7 43.9-99.4 10.2-21.5 18.4-43.4 18.5-67.7 0-6.1 1.5-12.2 7.2-16.1 2.6-1.5 5.4-1.1 8.1-.6 3 .5 5 2.3 6.1 5 1.3 7-2.3 11.6-6.2 16z' />
      <path d='M955.9 727.5c0-3.6-.5-7-2.9-9.9-3.5-7.7 2.5-11.4 6.9-15.1 17.3-14.6 37-23.3 60.2-22.5 3.2.1 6.5 0 9.8 0 7.6-.1 10.7-3.4 7.3-10.8-4.3-9.6-4.3-19.7-4.3-29.9.1-29.3.1-58.6 0-87.8 0-3.9 1.5-9-2.9-11.1-4.2-2-7.7 2-10.6 4.6-9.8 8.8-21.4 14.8-32.8 21-22.5 12.5-45.4 13.2-68.8 1.6-12.8-6.4-24.5-14.4-36-22.7-2.8-2-5.7-5.6-9.7-3.5-3.9 2-3 6.4-3 9.9-.1 28.1-.1 56.1 0 84.2 0 11.8.5 23.6-4.7 34.7-2.8 6-.3 9.4 6.2 9.8 5.7.3 11.4 0 17.1.2 21.8.8 39.9 10.3 56.1 24 3.9 3.3 8 7.4 5.1 13.7-2.7 1.8-4.5 4.2-5.1 7.4-4.1 3-6.8.2-9.5-2.3-31-28-67.6-25.9-104.7-18.5-42.7 8.5-73.7 34.5-99 68.4-16.5 22.2-35 42.7-53 63.6-6.6 7.7-15.1 13.6-23.1 19.8-12.4 9.6-13.1 11.4 1.2 18.8 23.3 12.1 40.8 30.6 58.7 48.9 4.1 4.2 7.9 8.5 4.5 15-2.4 1.7-4.3 3.8-5 6.8-5.2 2.8-8.1-.5-11.3-4-7.3-8.2-15.1-15.8-24.1-24.5-.3 13.6.9 26-.5 38.3-.9 8.1 1.2 18.8-11 21.6-3 .8-6 1.6-9.1 2.5-6.6-3.5-3.8-9.2-2.9-14.1 2.8-15.3 4.6-30.3 1.8-46-4-22.2-17-36.6-39.2-36.1-46.9 1-88.7 14.2-114.1 57.8-27.3 46.7-45.1 96.1-45.3 151.2-.1 36.3 30.9 50.1 60.2 38.9 13.5-5.2 23.7-14.5 33.2-25.9 23.6-28.5 44-59.5 70.8-85.4 9.4-9.2 15.9-20.5 23-31.5 2.8-4.3 5.1-9.8 12.2-7.4 1.9 4.1 4.6 8.1 2.8 13-26.2 37.2-59.5 68.5-85.8 105.5-25.3 35.6-57.8 66.8-74.1 108.2-18.2 46.2-48.6 83.5-82.6 117.9-20.5 20.7-44.3 38.3-67.4 56.4-16.2 12.7-23.7 30.4-31.9 48-1.5 3.3-.3 6.3 1.6 9.2 8.7 13.1 7.9 28.2 0 39.3-13.8 19.3-11.5 40.8-14.4 61.7-1.1 8-1.7 16.2-3.4 24.1-2.4 10.7-8.6 17.4-20.6 16.5-9.4-.7-17.2-8.9-17.2-20.2-.1-12.2-4.1-24-1.5-37.5-8.4 2.9-6.8 8.6-6 13.2 2.1 12.1.9 23.1-6.3 33.7-5.1 7.6-4.9 16.9-4.4 26 .5 8.1 1 16.3.6 24.4-.4 10.4-2.2 20.4-14.1 24.4-3.9 1.3-4.6 5.5-7 8.2-9.6 10.2-20.2 8.2-24.7-4.7-9.5-26.8-12.8-53.6-8.2-82.4 4.5-28.1 6.5-56.3 19.8-82.1 25.6-49.9 40.2-104.2 64.2-154.9 21.7-45.8 39.5-93.4 58.3-140.6 12.4-31.2 33.4-56.4 52.9-83 16.1-22.1 39.1-37.9 53.2-61.8 6.7-11.3 12-22.9 16.2-35.2 12.7-37.1 25.6-74.7 55.4-101.7 19.9-18.1 21.6-42.5 29.7-64.7 9.7-26.7 16.3-54.5 29-80.1 20-40.2 51-66.6 95.6-75.7 13.9-2.8 27.4-7.8 41.8-7.8 3.3 0 6.3-1.4 8.7-4 21.4-22.6 48.9-34.5 77.5-44.3 19.4-6.7 37.3-15.7 52.5-30 4.6-4.4 6.4-8.5 6.2-14.7-.4-14.2-1.1-28.6.1-42.8 1.7-20.3-4.4-39.3-7.6-58.9-.8-5-4.3-5.2-7.5-6.6-7.8-3.2-14.1-8.2-17.4-16.2-7.7-18.5-9.2-37.8-6.2-57.4 1-6.1 3.9-12.3 9.8-14.8 9.1-3.9 6.8-9.3 4.5-16.2-6.7-20-14.4-39.9-12.7-61.6 2.1-26.2 9.9-51 22.7-73.9 14.1-25.3 39.6-33.3 65.6-36.9 39.5-5.6 79.2-6.1 118.1 6.7 15.1 4.9 28 13 35.6 26.1 18 31.3 31.4 64.5 24.1 101.8-2.7 13.9-7.7 27.3-11.9 40.8-1.7 5.3-3 9.5 4.1 12.3 6.3 2.5 9.7 8.3 10.8 15.3 4 24.4 5.9 51.5-14.3 66.8-21.4 16.2-21.5 36.4-23.5 57.4-1.9 19.8.9 39.9-1.3 59.8-.3 3-1.1 6 2.1 8.8 16.9 15 35.6 26.7 57.2 33.8 28.8 9.5 56.2 21.7 77.7 44.2 2.7 2.8 6.1 4.2 9.8 4.3 15.7.2 30.3 5.4 45.3 8.9 51 11.8 81.8 46 99.4 93.2 12.9 34.6 24.3 69.7 33.5 105.5.8 3.2 2 6.1 4.7 8.3 35.9 30 53.1 71.2 67.6 113.8 8.7 25.4 22.9 46.4 41.6 66.1 35.8 37.8 66.7 79 87.2 128.2 25 59.9 46 121.4 75.6 179.5 10.2 20 15.2 42.7 23.2 64 7 18.6 16.3 36.2 23.8 54.5 6.4 15.7 11.9 31.2 10.8 48.3-1.1 16.4 5.7 31.8 5.3 48.4-.4 20-7.4 38.2-13.4 56.6-2.4 7.5-13.2 8-20.4 1.2-4.8-4.6-8.8-9.6-15-13.2-6-3.4-7.8-11-7.7-18.3.1-9.8-.2-19.6.2-29.3.5-10.9-1.1-20.9-7.6-30.1-5.6-7.9-5.8-16.5-3.2-25.7 1.6-5.7 3.1-12-6.6-16.2 0 11.1-.1 21 0 30.8.1 5.4-.5 10.6-2.7 15.5-3.8 8.7-9.8 13.7-20 12.3-9.5-1.3-14.8-7.6-15.9-16.1-2.1-15.6-5.5-31.2-5.3-47.1.2-11.6-2.9-21.9-9.3-32.1-9.2-14.7-11.9-30.4-3.1-47.2 5.9-11.1-4.6-19.4-8.3-28.4-6.2-15.4-19.2-25.8-31.9-36.2-26.7-21.9-54.8-42.1-77.4-68.8-25.6-30.2-49.4-61.2-63.4-98.9-10.8-29.2-34.2-50.2-50.6-75.9-16.9-26.6-40.5-47.7-57.4-74.2-3-4.8-6.7-9.4-10.9-13.1-16.2-14-29-30.6-39.9-48.8-1.8-4.6 1.8-8.2 2.5-12.3 5-2.4 7.8.7 9.9 4.3 11.6 19.9 29.2 34.9 43.1 52.7 18 23 37 45.3 54.6 68.7 14.2 18.7 32.5 29.2 56.7 27 17.4-1.6 29.2-12 33-29.2 5.5-25.1.2-49.6-5.6-73.6-6.9-28.1-18.4-54.7-31.7-80.4-23.8-46-63.9-65.2-113.3-68.2-28.6-1.8-46.1 14.8-47.8 43.5-.7 12.6-.2 25.2 2.4 37.7 1.1 5 1.7 9.8-3.8 12.8h-7c-10.7-.8-9.5-9.9-10.6-16.4-1.5-8.8-.4-17.8-.6-26.8-.1-4.3 1.1-8.9-1.6-13.7-10 5.9-17.5 14.1-24.5 22.9-3 3.8-5.9 8.3-11.9 4.5-.8-3.1-1.6-6.2-2.4-9.2-3.8-12.2 6.4-17.6 12.7-24.1 16.5-16.9 34.9-31.6 55.8-42.9 6.2-3.4 8.1-6.3 1.1-11.1-30.8-21-52.5-50.7-75.3-79.1-16.3-20.3-31.9-41.3-54.4-55.4-31.6-19.9-65.8-28.4-103.3-25.1-21.3 1.9-39.2 9.5-54.3 24.4-2.9 2.8-5.7 5.3-9.8 2.7z' />
      <g onClick={() => handleMuscleGroupClick('abdominals')} id='abdominals'>
        <path
          d='M838.2 1237.9c.5-55.9-2.8-96-6.8-136-1.3-12.5-.9-25.2 1.2-37.7 2.4-14 .7-27.1-5.1-40.4-12.8-29.4-4.5-47 26.2-57 21.6-7.1 43-14.6 66.3-14.6 10.3 0 17.8 3 22.8 12.8 4.9 9.8 10.8 9.8 16-.3 4.8-9.2 11.8-12.8 21.7-12.4 29.3 1 57.1 8.1 82.5 22.3 17.8 10 22.2 22.4 13.7 41.1-9.2 20.3-10 40.3-6.3 61.6 2.8 16.1-.6 32.4-2.4 48.4-3.2 28.3-5.3 56.7-4.4 85.2 1.4 44.4-2.4 88.8-8.5 132.3-9.3 66.3-37 125.8-86 173.6-11.6 11.3-25.5 10.9-37.7-1.1-41.2-40.5-66.4-90-79.7-145.6-11.6-48.5-10.5-98.4-13.5-132.2z'
          className='muscle-group'
        />
      </g>
      <g onClick={() => handleMuscleGroupClick('quadriceps')} id='quadriceps'>
        <path
          d='M877.7 1929.1c.8 22.5-5.1 44.2-8.3 66.2-3.8 26.5-7.3 53.3-16.5 78.4-10.3 28.1-20.5 57.2-52.3 69.6-17.7 6.9-31.2.8-37.5-17.1-4.4-12.2-8.9-24.4-13-36.7-4-12-12-15.1-23.8-12.6-22.7 4.9-34.5-2-40.8-24.2-13.6-47.4-22-95.5-23.5-145-1-33.7-5.4-67.4-4.2-101.2 1.3-34.5 4.8-68.8 10.3-102.8 1.3-8 0-15.3-.7-22.9-2-19.9 5.4-38.5 8.5-57.6 6.6-41.2 16.6-81.7 26.2-122.3 7.8-33.1 11.3-67.1 16.6-100.8.5-3.2.1-7.7 3-8.8 4-1.6 6.3 2.8 8.3 5.6 21.2 29 35.4 60.8 40.6 96.7 4.7 32.4 11 64.7 17 96.9 5 26.8 6.7 54 9.2 81.1 3.3 36.1 11.1 71.2 19.2 106.4 6.5 28.2 14.5 55.6 29 80.9 6.1 10.7 12.7 20.7 22 28.9 9 7.9 8.7 19.6 10.5 30.2.7 3.7.2 7.5.2 11.1zM1180.6 1387.8c3.3 26.2 8.4 49.1 12 72.2 4.2 27.2 8.9 54.2 16.7 80.7 9.8 33.4 12.4 68.3 20.4 102.2 3.8 15.8 3.9 31.6 3.5 48-.6 23.2 5.9 46.4 7.4 69.8 1.8 28.2 6.2 56.4 2.4 85-2.7 20.1-2.7 40.5-3.3 60.8-1.7 52.5-10.1 103.8-26.3 153.8-4.4 13.5-20 21.6-34 18.1-19-4.7-22.1-3.3-29.3 15.1-4.8 12.1-8.6 24.5-13.5 36.5-5.3 13.2-17.1 19.3-30.4 15.5-14.4-4.2-26.1-12.2-34.9-25-17.8-26.1-27.4-54.9-32.3-85.8-5.1-31.6-12.8-63-15.4-94.8-1.6-20.5-1-41.5 17.3-59.3 21.8-21.3 31.7-50.9 39.2-80.2 9.9-38.9 19-78 23.5-118 3.2-28.2 3.2-57.1 9.3-84.7 11.8-52.9 11-108.6 33.9-159 8-17.8 16.4-35.4 33.8-50.9z'
          className='muscle-group'
        />
      </g>
      <g onClick={() => handleMuscleGroupClick('calves')} id='calves'>
        <path
          d='M796.7 2233.5c-2.2 48.7 9.3 94.3 14.4 140.6 2.6 23.9-.1 46-14.7 67.3-13.2 19.3-18.6 43-25.7 65.5-15 47.6-20.4 96.7-23.5 146.2-.9 13.7.4 27.6 1.2 41.4.4 7.9-.3 15.9-3.8 22.6-7.9 15.1-6.2 30.6-4.5 46.4 1.3 12.1 2.5 24.3 3.1 36.5.5 11.3-7.8 17.2-16 22.7-5 3.4-10.5 6.2-15.7 9.5-8.2 5.1-12.6 12-12.3 22.2.3 11.7-3.3 21.1-16 25.8-8.4 3.1-14.7 9.7-19.9 17.4-14.1 20.5-26.1 23.1-47.9 10.5-4.3-2.5-7.8-1.1-11.5.7-6.4 3.1-11 .1-17.2-1.9-14.6-4.7-20.8-17.8-32.2-25.1-4.6-2.9-3.8-6.5-2.9-10.6 2.9-13.4 10.6-24.6 21.1-32 29.5-20.6 47.4-49 63.3-80.6 10.4-20.7 26.5-38.3 22.7-63.8 14.7-42.9 5.2-85.7.9-129-5.5-54.1-18.5-107.3-17.7-162 .6-41.3-3-82.9 5.7-123.9 5.9-27.9 16.4-54.3 26.6-80.9 1.8-4.8 4-5.4 8.2-3.1 6.3 3.4 10.6 8.6 14.3 14.6 7.3 11.7 13.9 24 25.6 32.2 21.5 15.1 42 5.2 62.5-2.5 3.5-1.6 6.9-4 11.9-6.7zM1105.1 2233.6c12.4 7.7 23.9 11.5 35.7 14.5 21.4 5.4 38.3-.5 51.2-18.5 5.2-7.2 10-14.8 14.7-22.5 2.6-4.3 6.2-7.4 10.3-10.3 5.6-4 8.4-3.2 11.4 3.9 20.4 48.8 33.7 98.8 31.2 152.3-1.1 23.2-.6 46.4-.4 69.6.3 29.8-7.4 58.6-10.4 88-3 29.8-7.3 59.4-11.6 89-1.8 12.1-1.5 24.3-2.8 36.3-2.5 23.3 8.8 44.6 8.4 67.3-.3 18.6 7.9 32.5 18.4 46.8 10.8 14.7 18.7 31.4 24.6 48.8 2.2 6.5 7.1 9.7 11.9 13.3 14.3 10.8 28.2 22.1 39.9 35.8 4.2 4.9 7.8 10.6 10.3 16.5 2.9 7 5.8 15.1-5.2 18.8-2.3.8-2 3.5-3.2 4.7-6.4 6.3-12.2 12.3-21.3 16.5-9 4.1-15.4 8.4-24.6 2.6-2.7-1.7-5.3-.3-7.9 1.2-20 12.2-34.1 9.5-47.2-10.2-5.7-8.5-12.6-15.1-21.7-18.8-9.8-4-14.2-11.1-13.8-20.7.6-14-5.8-23.2-17.6-29.5-30.8-16.4-28.2-21-24.9-56.6 1.8-19.7 4.3-39.6-4.6-58.6-4-8.4-2.3-17.4-2.1-26.3 1.6-71.3-7.9-140.8-32.5-208.1-6.4-17.6-13-34.8-23.5-50.6-12.4-18.7-9.1-40.4-6.7-60.6 5-44 14.9-87.7 14-134.6z'
          className='muscle-group'
        />
      </g>
      <g onClick={() => handleMuscleGroupClick('adductors')} id='adductors'>
        <path
          d='M885.6 1912.3c-2.9-17.3-11-28.2-20.8-39.8-19.3-22.7-29.2-50.9-36.5-80.1-7.9-31.9-15.5-63.8-20.2-96.3-3.3-23.3-5.6-46.8-7.4-70.3-2.8-35.3-11.8-69.6-16.6-104.5-3.6-26-7-52.3-17.7-76.8-9.6-22-19.9-43.5-37.4-61.6 10.2-2 16.8 3.5 24 6.7 39.9 17.8 70.1 45.4 91.5 84.1 16.8 30.4 24 63.5 33.4 96.1 7.8 27.1 20 52.2 36.5 75.1 3.3 4.6 7.3 9.2 12.8 11.1 10.8 3.7 11.8 11.8 11.8 21.3 0 61.4-7.6 121.3-30.6 178.8-7.2 17.7-11.6 36.4-22.8 56.2zM1172 1382.5c-27.8 34.2-44.6 71.7-50.2 114.9-4.3 33.2-12.2 66-17.2 99.2-4 26.4-6.7 53-8.9 79.6-2.7 31.6-9.4 62.4-16.5 93.1-6.9 29.5-13.9 59.3-30.1 85.6-6 9.7-11.6 19.3-21 26.6-9 6.9-8.7 19.1-12.4 30.7-10.2-17.4-15-35.4-21.3-52.8-15.1-41.8-28-84-30.4-128.6-1.2-21.1-.3-42.3-.7-63.5-.1-4.5 2-6.6 5.7-8.1 13.6-5.7 21.1-17.2 28.5-29.1 21.8-35.1 29-75.5 41.2-114 20-63.2 60-107.8 122.1-132.1 3.3-1.6 6.7-2.6 11.2-1.5z'
          className='muscle-group'
        />
      </g>
      <g onClick={() => handleMuscleGroupClick('obliques')} id='obliques'>
        <path
          d='M667 976.9c8-24.6 6.4-49.5 2-76.8 17 15.1 31.7 29.3 44.8 45.3 14.5 18.5 34.4 30.9 51.4 46.6 16.7 15.5 33.5 30.9 50.3 46.3 6.7 6.2 9 13.4 8.9 22.8-.4 30.2-7 59.3-13.3 88.6-7.3 34.2-5.2 68.4 1.9 102.7 5.2 25-2.4 48.7-12.2 71.9-8.5 20-21.4 35.2-41.6 43.8-1.1.5-2.2 1.2-3.3 1.6-8.6 3.3-18.2 5.3-26.3 2.7-12.7-4.2-3.5-15.6-2.8-22.2 3-30.2 4.3-60.7 10.8-90.6 9.7-44.8 2.8-86.6-18-128.4-18.4-36.8-37.3-74.2-47.4-114.6-3.5-12.8-3.7-26.4-5.2-39.7zM1185.7 947.5c13.4-16.6 28.6-31.5 45.2-46.3-.5 26.1-5.1 51.2 4 75.6-3 65.1-38.6 118.6-62.6 176.3-10.2 24.4-15 49.1-11.9 75.7 4 34.5 10.5 68.7 13.6 103.4 1.2 13.2.9 26.6 3.6 39.6-31.3 4.3-59.3-11.6-72.8-39.2-11.4-23.4-19.5-47.3-17-73.6 1-10.9 3.4-21.6 4.9-32.4 5.6-39.8.3-78.2-12.4-116.3-3.3-9.9-.4-21.8-2.5-32.3-4.4-22 3.6-36.5 20.2-51.4 24.8-22.3 50.1-43.9 75.2-65.9 4.5-4.1 9.6-7.6 12.5-13.2z'
          className='muscle-group'
        />
      </g>
      <g onClick={() => handleMuscleGroupClick('biceps')} id='biceps'>
        <path
          d='M1241.9 976.9c-2.6-14.8-5.4-29.4-5.1-44.6.7-39.3 21-59.3 59.9-55.5 22.1 2.2 43.8 7.5 63.8 18.5 26.7 14.7 42.2 38.7 55.3 64.6 10.9 21.4 19.7 43.9 25.7 66.9 7.1 27 12 54.6 5.9 82.8-3.1 14.4-12.4 23.8-25.6 28.5-25.4 9.2-58.4-4-74.5-25.6-21.6-28.9-42.6-58.5-68.5-83.9-14.2-13.9-23.2-31.2-34.4-47.1-.8-1.4-1.7-3-2.5-4.6zM657.3 980.9c-23.9 40.4-59.1 71.9-86.8 109.3-5.8 7.8-12 15.3-17.7 23.2-19.8 27.8-65.4 38.2-87.6 15.7-8.6-8.7-12.2-18.6-12.9-30.5-2.6-42.9 9.1-82.6 25.7-121.4 8.2-19.2 17.6-37.4 30.4-53.9 21.2-27.5 50.7-38.9 83.6-44.5 15.9-2.7 31.5-4.5 46.5 2.8 23 11.2 27 31.6 26.2 61.9-.3 12.1-3 24.1-6.6 35.8-.8.4-1 1-.8 1.6z'
          className='muscle-group'
        />
      </g>
      <path
        d='M755.2 1380.7c1.9-1.5 2.6-2.5 3.6-2.9 42-17.6 55.7-54 62.5-94.8 4.6-27.6-6.3-53.9-6.6-81.1-.3-24.7 3.5-48.9 9.6-72.8 5.6 29.2 4.9 58.5 4.8 87.7-.1 28.5 2.8 56.8 4.8 85.2 2.5 34.9 6.7 69.4 18.9 102.5 16.4 44.3 38.6 85 73.2 118 15 14.3 35 13.9 50-.9 43.2-42.7 69.8-94.6 82.3-153.5 11.5-54.2 13.2-109.4 13.2-164.7 0-24.7.6-49.5 4.7-75.8 8.1 15.2 6.7 30.7 9 45.3 4.1 25.8.5 51.5-4.8 76.9-4.6 22.3-.3 43.7 6.9 64.4 10.2 29.2 26 54.4 60.5 65.1-12.3 6.9-22.6 12.1-32.3 18.2-53.2 33.8-79.1 85.7-93.3 144.5-7.5 31-18.4 60.5-34.9 87.7-20.6 34.1-51.8 34.6-72.8.7-13.4-21.7-23.9-44.9-30.6-69.9-8.7-32.8-17.4-65.5-34.6-95.9-20.1-36-55.4-65.7-94.1-83.9z'
        className='non-hovered'
      />
      <g onClick={() => handleMuscleGroupClick('neck')} id='neck'>
        <path
          d='M948.8 717.6c-27.2-31.4-63.2-35.1-102.9-32.2 20.2-17 16.8-39.5 16.7-61.1v-102c9.7 7.4 17.9 13.7 26.1 20 11.3 8.7 23.7 15.6 36.6 21.6 21.2 9.8 40.9 5.6 60.5-4.6 18.7-9.8 34.9-23.3 53.3-37.7v29.3c0 30.1.4 60.2-.2 90.3-.4 16.7 3.2 31.2 19.1 45.3-41.3-3.5-78-1.1-104.9 31.1h-4.3z'
          className='muscle-group'
        />
      </g>
      <path
        d='M1046.5 2095.3c6.7 11.1 12.3 20.4 17.9 29.7 9.5 16.2 24.9 24.3 41.9 29.4 13.9 4.2 31-5.1 36.8-19.2 5.4-13.1 10-26.6 15-39.9 3.3-8.8 7.9-13.4 18.4-9.3 12.4 4.7 23.7-.6 36.6-8.7-4.2 34.3 10.2 64.5 9.6 96.6-.1 7.1-.6 12.2-8.3 15.2-12 4.6-16.3 16.5-22.5 26.4-22.3 35.2-40.4 28.5-67.5 18.7-15-5.4-27.3-15.9-36.2-29.6-15.6-23.9-29.6-48.4-36.4-76.5-2.6-10.3-3.9-20.6-5.3-32.8zM690.1 2078.4c12.9 8.9 25.7 11.6 39.9 6.4 7.1-2.6 10.4 3.9 12.5 8.9 4.8 11.6 8.6 23.6 12.9 35.4 8.5 23.5 26 30.9 49.2 21.8 15-5.9 26.5-15.4 34.5-29.4 3.8-6.7 8.1-13.1 12.7-20.6 2.7 3.5 1.9 7.4 1.3 10.3-9.1 42.4-25 81.3-57.5 111.6-11.7 10.8-26.6 15.3-41.9 18.1-16.3 2.9-28.1-3.9-37.8-16.6-10.4-13.6-15.8-31.8-34.3-38.2-4.2-1.5-2.1-5.5-2.3-8.5-2-23.1 5.8-44.9 8.3-67.5 1.1-10 1.6-20 2.5-31.7zM951 961.8c-11.9-23.2-31.7-16.5-52.1-16.7 23-18.3 41.8-37.3 51.3-67.1 11.2 28.3 27.8 49.2 52.5 66.4-19.8 2.1-40.9-7.2-51.7 17.4zM746.3 962.9c25.1 10.9 51.1 9.5 79.5 8.5-16.7 18.1-13.8 36.8-7.7 56.4-23.9-21.7-47.9-43.1-71.8-64.9zM1075.7 971.5c28.6.8 54.8 2.7 79.7-9-24.8 22.4-49.3 44.3-73.8 67.3 7.7-19.9 11.1-39.2-5.9-58.3zM1056.2 369.1c0 4.9.1 9.8 0 14.6-.1 4.1 1.2 6.5 5.4 8.2 15.1 6.1 20.4 14.1 18.9 29.3-1 10-2.7 20.1-5.1 29.9-2.2 9.2-8.1 17.2-17.4 18.5-8.9 1.2-10.9 6.5-11 12.9-.2 15.3-6.4 26.8-18.2 36.4-15.8 12.9-31.8 25.3-49.9 34.8-20.5 10.7-40.5 8.9-60.3-2.2-20.6-11.4-38.6-25.9-55.6-41.7-6.4-6-6.7-14.4-7.7-22.5-1-8.8-1.7-17.3-13.8-18.4-5.8-.5-10.2-5.4-12.3-10.9-6.2-16.1-9.7-32.5-6.4-50 1.6-8.2 5.8-13.7 13.7-15.2 7.8-1.5 9.4-5.8 9.4-12.9-.1-18.3-.7-36.6 1.7-54.8 1.1-8.3 3.5-15.8 7.7-22.8 10.3-17 12.5-16.7 31-10.9 45.8 14.3 91.7 15.9 136.5-4 5.4-2.4 9-2.4 12.9 1.8 10.1 11 17.9 22.9 18.2 38.6.3 13.8 1.5 27.5 2.4 41.2 0 .1-.1.1-.1.1z'
        className='non-hovered'
      />
      <g onClick={() => handleMuscleGroupClick('forearms')} id='forearms'>
        <path
          d='M445.4 1055.4c-1.3 16.8-2 31.8-1.2 47.1 1.7 32.8 33.6 52.2 65.7 46.6 6.6-1.2 13.1-3.6 22-6.1-17.6 19.9-31.7 39.7-40.3 62.6-17.2 45.7-48.4 81.6-81.6 115.6-19 19.4-41.5 35.4-62.9 52.3-11.4 9.1-20 20-27.2 32.5-8.9 15.7-29.7 18.4-43.5 6-13.4-12.1-16-25.7-8.2-42.1 24.9-52.9 44.6-108 67.1-161.9 14.1-33.8 32.8-64.2 55.5-92.8 16.4-20.6 35-39.1 54.6-59.8zM1459.3 1057.7c20.7 22.9 41.8 45.3 60.7 69.9 18.4 24 32.9 50 44.8 77.8 24.1 56.3 43.6 114.5 71.1 169.3 6.6 13.2.5 23.6-10.5 36.7-6.5 7.8-27.3 11.4-35.4 7.2-2-1-3.9-3.1-4.8-5.2-9.4-21.7-25.8-37.3-44.4-50.9-48.9-35.8-89.2-79.3-120.4-131.3-5.7-9.5-8.3-20.3-12.7-30.3-9-20.7-22-38.8-38.8-58.6 17.9 7.1 32.8 9.6 48.8 6 22.9-5.3 37.8-22.7 39.5-46.4 1-13.9.4-27.6-.5-41.4-.9-2.8.3-3.4 2.6-2.8z'
          className='muscle-group'
        />
      </g>
      <path
        d='M835.1 364.2c-4.3-14.7-9.3-26.9-9.4-39.7-.3-35.3 7.2-68.5 31.8-95.6 13.5-14.8 32.6-18.7 50.9-20.5 38.7-3.8 77.6-6.4 115.4 7.8 15.9 6 27.7 16.6 34.3 31.2 11.1 24.8 20.8 50.4 17.7 78.6-1.5 13.5-5.3 26.6-11.2 41.8-2.7-17.3-.3-32.2-2.9-46.9-2.1-11.7-6.9-21.6-13.8-30.8-11.5-15.3-15.9-15.6-33.6-7.8-13.3 5.9-27.3 10.7-42.2 10-23.4-1-47.2 3.4-70.1-4.7-6.9-2.4-14.1-3.9-20.3-8-8.2-5.5-15.2-3.5-21.8 3.1-13.4 13.6-21.2 29.5-21.3 48.9-.1 10 1.3 20.3-3.5 32.6zM1645.6 1397.5c6.9 26.1 17.6 48.3 26.4 71.3 4.2 10.9 8.7 21.9 14.5 32 10.2 17.7 10.8 37.1 12.4 56.4.5 6.5 1 12.9 2.7 19.2 6.6 23.7-1.6 45.6-8.7 67.5-.9 2.7-1.4 7.4-5.6 6.7-4.1-.7-7.3-3.8-7.6-8.5-.2-3.6-.5-7.5.4-10.9 8-28 2.2-53.5-12.3-78-5.5-9.3-12.4-17.9-15-28.9-1.2-5.1-5.6-7.9-10.3-9.6-7.8-2.8-12.4-1.5-12.2 8.4.3 12.5 1.8 25.1-1.7 37.6-1.8 6.2-3.7 12.6-11.2 12.1-7.7-.6-10.4-7.2-11.2-14-1.9-17.8-3.9-35.5-4.9-53.3-.4-7.2-1.6-13.6-6.2-19.1-15-17.8-11.1-36.4-2.8-55.4 1-2.3 3.1-2 5.1-2.3 31.2-5.1 31.2-5.2 48.2-31.2zM256.7 1396.9c9.4 23.2 25.4 32 46.8 32 2 0 3.7.1 4.8 2.6 8.4 18.9 13.3 37.5-2.5 55.4-7.4 8.3-6 19.3-6.7 29-.9 12.6-2.4 25-3.2 37.6 0 .8 0 1.7-.2 2.4-2.2 7.1-2.2 17.5-12.3 16.9-10-.6-11.4-10.2-11.8-18.5-.4-8.9-.1-17.9-.2-26.8-.1-5.1 1.9-11.6-5.1-13.4-6.4-1.7-13.4 1.4-15.6 6.9-11.6 27.6-33.5 51.2-33 83.6.1 9 .9 17.8 3.1 26.5.9 3.5 1.7 7.2 1.3 10.7-.5 4.1-3.2 8.1-7.5 8.8-4.9.8-5.2-4.2-6.4-7.3-8.8-24.4-14.2-49.1-6.6-75 .8-2.7 1.4-5.6 1.3-8.4-1.5-23.8 5-45.9 15.4-66.8 14.7-30 26.1-61.2 38.4-96.2z'
        className='non-hovered'
      />
      <g onClick={() => handleMuscleGroupClick('traps-upper')} id='traps-upper'>
        <path
          d='M853.1 606.2c0 18.9.8 35-.3 51-.9 12.8-24 33.7-37.1 35.5-1.5.2-3.2-.2-4.5-.9-24.3-13.2-50.7-15.9-77.7-15.6-1 0-2.1-.6-4-1.1 34.3-34.9 87.3-33.9 123.6-68.9zM1045.8 603.8c21 21.4 45.6 29.6 70.1 38.5 20.1 7.3 39.2 17 57.8 33.8-23.4-.3-43.9.8-63.6 7.2-2.7.9-5.9 1-8.1 2.6-15.2 6.7-21.9 6.1-32.9-1.6-13-9.2-22.8-20.5-22.5-36.8.3-13.5 1.5-27.2-.8-43.7z'
          className='muscle-group'
        />
      </g>
      <path
        d='M1653.1 1547.5c17.7 20.7 27.3 50.5 18.1 89.1-7.3-2.3-8.2-8.7-8.6-14.3-.6-7.6-.3-15.4.7-23 1.7-13.4-.3-25.8-7.3-37.3-2.5-4.3-5.5-8.2-2.9-14.5zM248.7 1546.8c1.5 4.1 1.2 8-1.3 11.5-10.3 14.5-11.1 30.8-9.4 47.8 1 10.3 2.1 21-5.2 30.5-13.3-19.5-5.1-68.6 15.9-89.8z'
        className='non-hovered'
      />
      <path
        d='m1459.3 1057.7-2.7 2.7c-1.8-2.2-3.7-5.3-1.1-7 1.7-1.2 3.3 2 3.8 4.3z'
        style={{
          fill: '#5a0000',
        }}
      />
      <path d='M922.3 1033.2c1 .1 4.7.1 8.3.5 9.6 1.2 14.7-2.1 14.3-12.7-.3-7.3.8-14.6 1.2-21.9.2-3.4.4-7 5-6.7 3.4.2 4.4 3.2 4.5 6.3.2 6.9.7 13.9.2 20.7-.8 11.4 4.5 15.1 15.3 14.3 22.9-1.8 45.6.2 66.9 9.4 5.7 2.4 17.1 4.9 13.3 12.2-3.6 6.9-10.8-2.6-16.2-4.8-19.7-8-40.2-9.2-61-8.1-6.8.3-13.8 2-19.5-3.9-1.2-1.3-3.6-3-5.4-1.4-13.3 11.9-29.1 3-43.5 5.1-16.6 2.4-33 3.7-47.6 13.1-2.7 1.7-6.3 4.4-8.6.9-2.9-4.2 1.6-6.3 4.5-8.3 12.7-9.1 38.8-14.9 68.3-14.7zM998.5 1272.5c-14.2-1.9-30.9 3.7-47.1-4.7-4.8-2.5-11 5.1-18 4.9-22.4-.5-44.8-.2-67.1-.3-3.7 0-9.6 1.7-9.4-4.2.2-4.9 5.9-4.8 9.8-4.8 21.5-.1 43-.2 64.6.1 10.7.2 16.1-3.8 15-15.2-.5-5.6-.2-11.4 0-17.1.1-3-.9-7.3 3.9-7.5 5-.2 5.5 4 5.6 7.7.2 6.1.6 12.2 0 18.3-.9 9.4 3 13.7 12.4 13.7 20.7 0 41.4.1 62.1.1 2.4 0 4.9-.3 7.3.1 3.2.5 7.1 1 6.5 5.5-.5 3.8-4.1 3.3-6.8 3.3-12.3.1-24.5.1-38.8.1zM1022.2 1161.4c-23.5-.9-47.3-.4-68.2-13.8-2.3-1.5-4-2-6.5-.3-20 13.4-42.9 13.3-65.6 14.3-5.3.2-10.5.7-15.8.8-3.1.1-7.4 1.2-7.9-3.3-.5-5 4.1-5.4 7.7-5.7 5.7-.4 11.4-.5 17.1-.3 15.5.6 30.8-1.4 45.7-5.6 12.2-3.4 20.1-10 17.6-24.5-.9-5.1-.2-10.5 0-15.8.1-2.6.7-5 3.8-5.2 3.5-.3 5.4 1.9 5.5 5.1.2 7.3.7 14.7.1 21.9-.7 8.3 3.1 12.8 10.3 15.8 16.9 6.9 34.5 8.5 52.5 8.3 6.9-.1 13.8.4 20.6 1 2.4.2 4.7 1.9 4.4 4.9-.4 3.1-3 3.6-5.5 3.5-5.3-.3-10.6-.8-15.8-1.1zM917.8 1165.2c9.8-.2 18.7 0 27.1 3.9 3.9 1.8 7.8 1.4 11.8-.1 21.2-7.5 42.4-3.2 63.6.6 2.7.5 6.3.6 5.7 4.7-.7 4-4.4 3.2-7 2.9-15.7-2.1-31.3-3.7-47.3-2.8-11.6.6-17.6 4.2-16.2 16.8.4 3.9 1.9 10.4-5 10.2-7.1-.2-4.6-6.8-4.3-10.5 1.1-12-4.8-15.8-15.7-16.3-14.2-.6-28.3-.4-42.4 2.1-4.2.8-11.2 3.6-12.4-2.6-1.1-5.9 6.6-5.2 10.2-5.6 11-1.3 21.7-4.4 31.9-3.3zM893.6 1278.8c16.2 1.5 35.5 1.2 53.2 9.6 3.5 1.7 6 .5 9.1-.8 20-7.9 41.2-8.7 62.3-8.8 3.1 0 7.6-.3 7.6 4.1 0 5.5-5 4.3-8.4 4.2-16.4-.5-32.4 1.7-48.4 4.8-9.3 1.8-14.9 5.7-13.3 16.2.5 3.2 0 6.5-.5 9.7-.4 2.8-2.6 4.1-5.3 3.8-2.3-.3-3.4-2-3.6-4.2-.1-.8-.1-1.6-.2-2.4-2.5-21.2-3.4-22.3-24.7-25.2-12.1-1.7-24.2-3.1-36.5-2.7-3.5.1-9.5 2.1-9.2-4.4.2-5 5.5-3.5 8.9-3.9 2.1-.2 4.2 0 9 0z' />
      <path d='M914 1047.9c11.4 1.1 21.3 3.5 30 9.1 4.7 3.1 8.6 3.1 13.3 0 20.9-13.4 42.9-7.9 64.7-3.1 2.9.6 7.2 1.8 5.7 6.2-1.4 4.2-5.5 2.4-8.5 1.8-16.2-3.3-32.4-7.9-49-1.8-8.2 3-16.2 6.3-14.8 17.7.4 2.9-.9 5.8-4.4 6.2-3.8.4-4.4-2.3-5-5.4-2.6-13.6-10.5-20-25.8-21.1-12.7-.8-25 1.2-37.3 4.1-3.3.8-8 2.9-9.5-1.6-1.6-4.9 3.8-5.9 6.9-6.5 11.7-2.3 23.3-3.9 33.7-5.6zM955.6 1418.1v67.2c0 4.2 1.6 10.3-5.4 9.9-6-.4-4-6.2-4-9.8-.1-45.2-.1-90.4 0-135.6 0-3.7-1.7-9.4 4.5-9.4 5.7 0 5 5.4 5 9.3.1 22.8 0 45.6 0 68.4h-.1z' />
      <g
        onClick={() => handleMuscleGroupClick('deltoid-lateral')}
        id='deltoid-lateral'
      >
        <path
          d='M1257.4 742.3c-31.8-38.9-57.6-51.3-65.7-55.6-2.6-1.4 7.6.5 42 7.1 43.2 8.3 72 35.6 90.7 74.3 10.6 22 17.8 45.4 24.3 68.8 4.5 16.2 12.4 31.4 15.1 50.1-7-3.8-25.1-9.9-35.8-13.2-10.2-3.1-32.8-7.3-40.7-8.2-3.7-30.7 2.5-83.7-29.9-123.3zM614.3 866.1c-7.9 1-30.5 5.2-40.7 8.2-10.7 3.3-28.8 9.4-35.8 13.2 2.6-18.7 10.5-33.9 15.1-50.1 6.6-23.4 13.8-46.8 24.3-68.8 18.6-38.8 47.5-66 90.7-74.3 34.4-6.6 44.6-8.5 42-7.1-8.1 4.3-33.9 16.7-65.7 55.6-32.4 39.7-26.2 92.7-29.9 123.3z'
          className='muscle-group'
        />
      </g>
      <g
        onClick={() => handleMuscleGroupClick('deltoid-anterior')}
        id='deltoid-anterior'
      >
        <path
          d='M752.8 686.8c7.6.6 16.5 1.2 36.4 5.9 1.9.6 8.5 1.8 14 4.1-47.4 16.5-73.1 53.2-100.6 87.9-23.1 29-45.2 55-78.2 73.8-.9-7.2.7-19.9 1.7-31.2.8-8.6.3-20.1 3-30.3 1.1-4 2.3-18.1 16.7-40.5 23.6-36.6 60.8-59.5 81.3-70.2l25.7.5zM1174.9 686.2c20.5 10.7 57.7 33.6 81.3 70.2 14.5 22.4 15.6 36.4 16.7 40.5 2.7 10.2 2.2 21.7 3 30.3 1 11.4 2.6 24.1 1.7 31.2-33-18.8-55.1-44.7-78.2-73.8-27.6-34.7-53.2-71.4-100.6-87.9 5.5-2.3 12.1-3.5 14-4.1 19.8-4.7 28.8-5.3 36.4-5.9l25.7-.5z'
          className='muscle-group'
        />
      </g>
      <g
        onClick={() => handleMuscleGroupClick('pectoralis-upper')}
        id='pectoralis-upper'
      >
        <path
          d='M1189 843.9c-39.6-20.7-54-45.1-88.9-74.8-23.6-20.1-60.5-45.9-115.7-66 28.1-13.8 57.7-11.9 86.9-6.2 45.4 8.9 78.5 36.2 105.9 72.5 22.9 30.4 38.3 55.7 80.3 86.1 7.2 5.2 13.4 9.2 17.6 11.8-21.5-1.3-53.1-6.2-86.1-23.4zM626.2 867.4c4.2-2.6 10.4-6.6 17.6-11.8 42-30.5 57.4-55.8 80.3-86.1 27.4-36.3 60.6-63.6 105.9-72.5 29.2-5.8 58.7-7.6 86.9 6.2-55.2 20.1-92.1 45.9-115.7 66-34.9 29.7-49.3 54.1-88.9 74.8-32.9 17.1-64.6 22-86.1 23.4z'
          className='muscle-group'
        />
      </g>
      <g
        onClick={() => handleMuscleGroupClick('pectoralis-middle-lower')}
        id='pectoralis-middle-lower'
      >
        <path
          d='M924.5 708.5c2.3 1.2 4.9 1.7 7.5 3.8 5.4 4.2 8.9 8.9 11 12.4 3.1 4.3 2.4 9.2 2.4 14.1 0 36.6-.9 73.2.4 109.8.6 17.3-4.2 32.6-12.6 46-25.6 40.6-63.4 62-111 67.9-27 3.4-52.3.2-77.4-10-9.5-3.8-18-9.1-26.8-14.1-10.1-17.6-25.7-37.7-50.2-50-16.3-8.2-30.8-12.9-22.3-14.6 2.9-.6 4.1-.3 21.4-3.3 11.5-2 24.9-7.2 38.2-13.2 32.8-14.7 43.9-26 68.5-49.7 26.1-28 75-69.9 150.9-99.1zM1128.7 807.5c24.6 23.7 35.7 35 68.5 49.7 13.2 6 26.7 11.2 38.2 13.2 17.3 3 18.5 2.7 21.4 3.3 8.5 1.8-6 6.4-22.3 14.6-24.5 12.3-40.2 32.5-50.2 50-8.8 5-17.2 10.2-26.8 14.1-25.1 10.2-50.4 13.4-77.4 10-47.6-6-85.4-27.3-111-67.9-8.5-13.4-13.3-28.7-12.6-46 1.3-36.5.4-73.2.4-109.8 0-4.8-.7-9.8 2.4-14.1 2.1-3.5 5.6-8.2 11-12.4 2.7-2.1 5.2-2.6 7.5-3.8 75.9 29.3 124.8 71.2 150.9 99.1z'
          className='muscle-group'
        />
      </g>
    </svg>
  );
};
export default FrontAnatomy;
