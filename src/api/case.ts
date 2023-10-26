import axios from 'axios';
import qs from 'query-string';

export interface PolicyRecord {
  caseName: string;
  source: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number;
  pageSize: number;
}

export interface PolicyListRes {
  data: PolicyRecord[];
}

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('/api/edp_test_case', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface CreateEdpCase {
  source: string;
  commands: { value: string }[];
}

export interface CreateEdpCaseRes {
  status: string;
  msg: string;
  code: number;
}

export function CreateEdpCasePar(data: CreateEdpCase) {
  return axios.post<CreateEdpCaseRes>('/api/edp_Case_list/run_edp_Case', data);
}

export interface DownloadCaseLog {
  taskId: string;
}

export interface DownloadCaseLogRes {
  data: Blob;
}

export function DownloadCaseLogPar(data: any) {
  return axios.post<DownloadCaseLogRes, any>(
    '/api/edp_Case_list/download_Case_logs',
    data
  );
}
