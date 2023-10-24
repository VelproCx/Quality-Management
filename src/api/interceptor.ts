import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { clearToken } from '@/utils/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response;
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      Message.error({
        content: 'Error',
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [50008, 50012, 50014].includes(res.status) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: 'Confirm logout',
          content:
            'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re-Login',
          async onOk() {
            const userStore = useUserStore();
            await userStore.logout();
            window.location.reload();
            // You can keep this line if HTTP 422 should also redirect
            router.push({ name: 'login' });
          },
        });
      }
      return Promise.reject(new Error(res.status));
    }
    return res;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 422) {
      // 2. 清除本地存储中的 token
      clearToken();

      // 3. 将用户的认证状态标记为未登录
      //   setUserAsNotAuthenticated();

      // 4. 使用路由器重定向到登录页面
      // Keep this line if you want HTTP 401 to redirect
      router.push({ name: 'login' });

      return Promise.reject(error);
    }
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
