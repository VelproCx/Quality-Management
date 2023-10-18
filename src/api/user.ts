import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import qs from 'query-string';

export interface LoginData {
  email: string;
  password: string;
  code: string;
  rememberPassword: boolean;
}

export interface UserForm {
  role: string;
  createdTime: [];
  email: string;
  name: string;
  id: number;
  locked: boolean;
}

export interface SearchParams extends Partial<UserForm> {
  current: number;
  pageSize: number;
}

export interface SearchListRes {
  data: UserForm[];
}

export function queryUserList(params: SearchParams) {
  return axios.get<SearchListRes>('/api/user/user_list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface CreateUser {
  role: string;
  email: string;
  name: string;
  password: string;
}

export interface CreateUserRes {
  data: UserForm[];
}

export function CreateUserReq(data: CreateUser) {
  return axios.post<CreateUserRes>('/api/user/create-user', data, {
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface DeleteUser {
  id: string;
}

export interface DeleteUserRes {
  data: UserForm[];
}

export function DeleteUserReq(data: DeleteUser) {
  return axios.post<DeleteUserRes>(`/api/user/delete-user`, data, {
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface EditUser {
  id: string;
}

export interface EditUserRes {
  data: UserForm[];
}

export function EditUserReq(data: UserForm) {
  return axios.post<EditUserRes>(`/api/user/update-user`, data, {
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getUserDetail(params: EditUser) {
  return axios.get<EditUserRes>(`/api/user/user-info`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export interface LoginRes {
  access_token: string;
  role: string;
  email: string;
  name: string;
  password: string;
  id: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data, {
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/api/user/user-info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
