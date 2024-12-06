import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { profileMenuItems } from '../../config/navigation';

const ProfileMenu = ({ profile, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSignOut = () => {
    setIsOpen(false);
    onSignOut();
  };

  // Close the menu if click happens outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu if the click is outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative ml-3' ref={menuRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-3 rounded-lg bg-gray-700 
          p-2 sm:px-4 sm:py-2 hover:bg-gray-600 cursor-pointer
          transition duration-150'
      >
        <img
          alt='User Avatar'
          src='/defaultProfile.png'
          className='h-8 w-8 rounded-full object-cover border-2 border-gray-600'
        />
        <span className='hidden sm:inline text-white text-base font-medium'>
          {profile.first_name} {profile.last_name}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className='absolute z-10 mt-2 w-56 origin-top-right rounded-lg 
          bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5
          transform -translate-x-1/2 left-1/2'
        >
          {profileMenuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className='flex items-center px-4 py-3 text-sm text-gray-700 
                transition duration-150 hover:bg-gray-100 w-full'
            >
              {item.icon && (
                <item.icon
                  className='mr-3 h-5 w-5 text-gray-500'
                  aria-hidden='true'
                />
              )}
              {item.name}
            </NavLink>
          ))}

          <div className='my-1 border-t border-gray-100' />

          <button
            onClick={handleSignOut}
            className='flex items-center px-4 py-3 text-sm text-gray-700 
              transition duration-150 hover:bg-gray-100 w-full text-left'
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
