import { signup } from "./auth.interface";

export type charttype = "doughnut" | "bar" | "line" | "scatter" | "bubble" | "pie" | "polarArea" | "radar";
export type UpdateData = addCustomer | signup;
export type permissionType = 'CN' | 'CE' | 'P' | 'UN' | 'UE';
export type sortOrder = 'asc' | 'desc';

export interface MenuItem {
  route: string;
  name: string;
  iconName: string;
  active?: boolean;
}

export interface filtitem {
  name: string;
  iconName: string;
}

export interface chartData {
  title: string;
  value: string;
}

export interface tableListData {
  cName: string;
  cNotes: string;
}


export interface updateUser {
  id: number;
  cName: string;
  cEmail: string;
  cPass: string;
  bCheck: boolean;
}

export interface addCustomer {
  id?: number;
  cName: string;
  cNotes: string;
}

export interface tabRows {
  name: string;
  sortable?: boolean;
}



