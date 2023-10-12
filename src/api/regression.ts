import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

export interface PolicyRecord {
  createdTime: string;
  source: string;
  status: string;
  taskId: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number;
  pageSize: number;
}

export interface PolicyListRes {
  data: PolicyRecord[];
}

// search
export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('api/edp_regression_list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface CreateEdpRegression {
  source: string;
  commands: [];
}

export interface CreateEdpRegressionRes {
  status: string;
  msg: string;
  code: number;
}

// create regression task
export function CreateEdpPerformancePar(data: CreateEdpRegression) {
  return axios.post<CreateEdpRegressionRes>(
    '/api/performance_list/run_edp_regression',
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
