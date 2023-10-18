import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const TASK: AppRouteRecordRaw = {
  path: '/task',
  name: 'task',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.task.management',
    requiresAuth: true,
    icon: 'icon-calendar',
    order: 1,
  },
  children: [
    {
      path: 'my-task',
      name: 'myTask',
      meta: {
        locale: 'menu.task.myTask',
        requiresAuth: true,
        roles: ['*'],
      },
      component: () => import('@/views/task-management/my-task/index.vue'),
    },
  ],
};

export default TASK;
