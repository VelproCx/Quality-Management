import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

export interface PolicyRecord {
  startTime: string;
  endTime: string;
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

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('api/edp_performance_list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface CreateEdpPerformance {
  source: string;
  commands: { value: string }[];
}

export interface CreateEdpPerformanceRes {
  status: string;
  msg: string;
  code: number;
}

export function CreateEdpPerformancePar(data: CreateEdpPerformance) {
  return axios.post<CreateEdpPerformanceRes>(
    '/api/edp_performance_list/run_edp_performance',
    data
  );
}

export interface DownloadPerformanceLog {
  taskId: string;
}

export interface DownloadPerformanceLogRes {
  data: [];
}

export function DownloadPerformanceLogPar(params: DownloadPerformanceLog) {
  return axios.get<DownloadPerformanceLogRes>(
    '/api/edp_performance_list/download_performance_logs',
    {
      params,
      paramsSerializer: (obj) => {
        return qs.stringify(obj);
      },
    }
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
