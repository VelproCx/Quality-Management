// export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  name?: string;
  email?: string;
  role: string;
  id?: number;
  status?: string;
  createTime?: string;
  updateTime?: string;
  isDelete?: string;
}
