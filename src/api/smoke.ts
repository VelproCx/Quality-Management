import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

//
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

// search regression
export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('api/edp_smoke_list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface CreateEdpSmoke {
  source: string;
  ip: string;
  port: string;
  sender: string;
  target: string;
  account: string;
  market: string;
  actionType: string;
  orderQty: number;
  ordType: string;
  side: string;
  symbol: string;
  timeInForce: string;
  crossingPriceType: string;
  rule80A: string;
  cashMargin: string;
  marginTransactionType: string;
  minQty: number;
  orderClassification: string;
  selfTradePreventionId: string;
  price: number;
}

export interface CreateEdpSmokeRes {
  status: string;
  msg: string;
  code: number;
}

// create regression task
export function CreateEdpSmokePar(data: CreateEdpSmoke) {
  return axios.post<CreateEdpSmokeRes>(
    '/api/edp_smoke_list/run_edp_smoke',
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
