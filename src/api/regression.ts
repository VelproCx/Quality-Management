import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

export interface PolicyRecord {
  source: string;
  status: string;
  createdTime: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number;
  pageSize: number;
}

export interface PolicyListRes {
  data: PolicyRecord[];
  total: number;
  status: string;
  msg: string;
  code: number;
}

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('api/edp_regression_list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface CreateEdpRegression {
  ip: string;
  port: string;
  account: string;
  sender: string;
  target: string;
  source: string;
}

export interface CreateEdpRegressionRes {
  status: string;
  msg: string;
  code: number;
}

export function CreateEdpRegressionPar(data: CreateEdpRegression) {
  return axios.post<CreateEdpRegressionRes>(
    'api/edp_regression_list/create_regression_task',
    data
  );
}

export interface ServiceRecord {
  title: string;
  description: string;
  name?: string;
  icon?: string;
  data?: DescData[];
  enable?: boolean;
  expires?: boolean;
}
