import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';
import localeTask from '@/views/task-management/my-task/locale/zh-CN';
import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
import localEdpRegression from '@/views/edp-management/regression/locale/zh-CN';
import localEdpPerformance from '@/views/edp-management/performance/locale/zh-CN';
import localEdpFullstock from '@/views/edp-management/performance/locale/zh-CN';
import localRolxRegression from '@/views/rolx-management/regression/locale/en-US';
import localRolxPerformance from '@/views/rolx-management/performance/locale/en-US';
import localRolxFullstock from '@/views/rolx-management/fullstock/locale/en-US';
import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.task.management': '测试任务',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  'menu.edp.performance': '压力测试',
  'menu.edp.regression': '回归测试',
  'menu.edp.fullstock': '全股测试',
  'menu.edp.management': 'EDP 管理',

  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...localeTask,
  ...localEdpRegression,
  ...localEdpPerformance,
  ...localEdpFullstock,
  ...localRolxRegression,
  ...localRolxPerformance,
  ...localRolxFullstock,
};
