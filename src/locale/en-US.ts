import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';
import localeTask from '@/views/task-management/my-task/locale/en-US';
import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';
import localEdpRegression from '@/views/edp-management/regression/locale/en-US';
import localEdpPerformance from '@/views/edp-management/performance/locale/en-US';
import localEdpFullstock from '@/views/edp-management/fullstock/locale/en-US';
import localEdpSmoke from '@/views/edp-management/smoke/locale/en-US';
import localEdpCase from '@/views/edp-management/case/locale/en-US';
import localRolxRegression from '@/views/rolx-management/regression/locale/en-US';
import localRolxPerformance from '@/views/rolx-management/performance/locale/en-US';
import localRolxFullstock from '@/views/rolx-management/fullstock/locale/en-US';
import localUser from '@/views/user-management/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.user': 'User Management',
  'menu.task.management': 'Task Management',
  'menu.edp.management': 'EDP Management',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'menu.edp': 'EDP',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...localeTask,
  ...localEdpSmoke,
  ...localEdpRegression,
  ...localEdpPerformance,
  ...localEdpFullstock,
  ...localEdpCase,
  ...localRolxRegression,
  ...localRolxPerformance,
  ...localRolxFullstock,
  ...localUser,
};
