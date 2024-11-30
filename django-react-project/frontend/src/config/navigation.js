import { UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export const getNavigation = (isAuthenticated) => [
  { name: 'Home', href: '/' },
  isAuthenticated
    ? { name: 'Exercises', href: '/exercises' }
    : { name: 'Member Portal', href: '/login' },
];

export const profileMenuItems = [
  {
    name: 'Your Profile',
    href: '/profile',
    icon: UserCircleIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon,
  },
];
