import axios from 'axios';
import qs from 'query-string';

export interface PolicyRecord {
  createTime: string;
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
  data: Blob;
}

export function DownloadPerformanceLogPar(data: any) {
  return axios.post<DownloadPerformanceLogRes, any>(
    '/api/edp_performance_list/download_performance_logs',
    data
  );
}
