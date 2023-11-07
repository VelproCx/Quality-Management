import axios from 'axios';
import qs from 'query-string';

export interface PolicyRecord {
  caseName: string;
  source: string;
  updateTime: string;
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

export interface editEdpCase {
  caseName: string;
}

export interface EditEdpCaseRes {
  data: [];
}

export interface ViewEdpCaseDetail {
  id: string;
  scenarioName: string;
  account: string;
  market: string;
  actionType: string;
  comment: string;
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
  orderStatus: [];
  errorCode: string;
}

export function EditEdpCasePar(params: editEdpCase) {
  return axios.get<EditEdpCaseRes>('/api/edp_test_case/view', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
