import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

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
  commands: { value: string }[];
}

export interface CreateEdpRegressionRes {
  status: string;
  msg: string;
  code: number;
}

// create regression task
export function CreateEdpRegressionPar(data: CreateEdpRegression) {
  return axios.post<CreateEdpRegressionRes>(
    '/api/edp_regression_list/run_edp_regression',
    data
  );
}

export interface DownloadRegressionLog {
  taskId: string;
}

export interface DownloadRegressionLogRes {
  data: Blob;
}

export function DownloadRegressionLogPar(params: DownloadRegressionLog) {
  return axios.get<DownloadRegressionLogRes>(
    '/api/edp_regression_list/download_edp_log',
    {
      params,
      paramsSerializer: (obj) => {
        return qs.stringify(obj);
      },
      responseType: 'blob',
    }
  );
}

export interface DownloadRegressionRep {
  taskId: string;
}

export interface DownloadRegressionRepRes {
  data: [];
}

export function DownloadRegressionRepPar(params: DownloadRegressionRep) {
  return axios.get<DownloadRegressionRepRes>(
    '/api/edp_regression_list/download_edp_report',
    {
      params,
      paramsSerializer: (obj) => {
        return qs.stringify(obj);
      },
    }
  );
}
