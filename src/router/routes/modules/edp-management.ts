import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const EDPMANAGEMENT: AppRouteRecordRaw = {
  path: '/edp-management',
  name: 'edp_management',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.edp.management',
    requiresAuth: true,
    icon: 'icon-subscribed',
    order: 2,
  },
  children: [
    {
      path: 'edp-smoke',
      name: 'edp-smoke',
      component: () =>
        import('@/views/edp-management/smoke/smoke-management.vue'),
      meta: {
        locale: 'menu.edp.smoke',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'edp-regression',
      name: 'edp-regression',
      component: () =>
        import('@/views/edp-management/regression/regression-management.vue'),
      meta: {
        locale: 'menu.edp.regression',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'edp-performance',
      name: 'edp-performance',
      component: () =>
        import('@/views/edp-management/performance/performance-management.vue'),
      meta: {
        locale: 'menu.edp.performance',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'edp-fullstock',
      name: 'edp-fullstock',
      component: () =>
        import('@/views/edp-management/fullstock/fullstock-management.vue'),
      meta: {
        locale: 'menu.edp.fullstock',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'edp-case',
      name: 'edp-case',
      component: () =>
        import('@/views/edp-management/case/case-management.vue'),
      meta: {
        locale: 'menu.edp.case',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default EDPMANAGEMENT;
