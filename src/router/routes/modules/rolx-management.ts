import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const ROLXMANAGEMENT: AppRouteRecordRaw = {
  path: '/rolx-management',
  name: 'rolx_management',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.rolx.management',
    requiresAuth: true,
    icon: 'icon-subscribed',
    order: 2,
  },
  children: [
    {
      path: '/rolx-regression',
      name: 'rolx-regression',
      meta: {
        locale: 'menu.rolx.regression',
        requiresAuth: true,
        roles: ['*'],
      },
      component: () =>
        import('@/views/rolx-management/regression/regression-management.vue'),
    },
    {
      path: '/rolx-performance',
      name: 'rolx-performance',
      meta: {
        locale: 'menu.rolx.performance',
        requiresAuth: true,
        roles: ['*'],
      },
      component: () =>
        import(
          '@/views/rolx-management/performance/performance-management.vue'
        ),
    },
    {
      path: '/rolx-fullstock',
      name: 'rolx-fullstock',
      meta: {
        locale: 'menu.rolx.fullstock',
        requiresAuth: true,
        roles: ['*'],
      },
      component: () =>
        import('@/views/rolx-management/fullstock/fullstock-management.vue'),
    },
  ],
};

export default ROLXMANAGEMENT;
