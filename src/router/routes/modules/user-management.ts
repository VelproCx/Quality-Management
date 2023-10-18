import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/user-management',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 0,
  },
  children: [
    {
      path: 'users',
      name: 'users',
      meta: {
        locale: 'menu.user.management',
        requiresAuth: true,
        roles: ['*'],
      },
      component: () => import('@/views/user-management/user-management.vue'),
    },
  ],
};

export default USER;
