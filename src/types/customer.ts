export interface IFilterCustomerParams {
  userMisEmployee: string;
  cif: string;
  statusContact: string;
  fromDate: string;
  toDate: string;
}

export interface IDetailCustomerParams {
  idHis: string;
  cif: string;
}

export interface IUpdateCustomerParams {
  idHis: string;
  cif: string;
  statusContact?: string;
  note?: string;
  userMisEmployee?: string;
  employeeId ?: string;
}

export interface ICustomerRes {
  listCustomerDataList: ICustomer[];
}
export interface ICustomer {
  id?: any;
  assignmentDate?: string;
  birthDate?: string;
  cif?: string;
  fullName?: string;
  idHis?: number;
  note?: string | null;
  statusContact?: string;
  stt?: number;
  compaignId?: string;
  compaignDescription?: string;
  mobilePhone?: string;
  email?: string;
  customerClass?: string;
  branchManageCif?: string;
  sex?: string;
  openDateCif?: string;
  statusCif?: string;
  statusAssignment?: string;
  userMisEmployee?: string;
  employeeId?: string;
  branchEmployee?: string;
  userMisUnitHead?: string;
  dateAssignment?: string;
  allowViewCustomerInfo?: "0" |"1"
}

export interface IProcessHistory {
  processDate: string | null;
  processHours: string | null;
  userMisEmployee: string | null;
  fullName: string | null;
  statusContactCode: string;
  statusContactName: string;
  employeeId?: string | null;
  note: string | null;
  userMisUnitHead?: string;
  hdCodeUnitHead?: string
}

export type IDetailCustomer = ICustomer & {
  processHistoryList?: IProcessHistory[];
};
