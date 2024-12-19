import { UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export const getNavigation = (isAuthenticated) => {
  const navigation = [{ name: 'Home', href: '/' }];

  if (isAuthenticated) {
    navigation.push(
      { name: 'Exercises', href: '/exercises' },
      { name: 'Manage', href: '/manage' }
    );
  } else {
    navigation.push({ name: 'Member Portal', href: '/login' });
  }

  return navigation;
};

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
