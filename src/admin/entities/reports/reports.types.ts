export enum EReportTypes {
  WITHDRAW = "withdraw",
  DEPOSIT = "deposit",
}

export interface IReportsState {
  isLoading: boolean;
  isOpenDayReport: boolean;
  isOpenBetweenReport: boolean;
  error: string;
  reports: IReport[];
  snackbar: {
    message: string;
    isShow: boolean;
  };
  ordersHistory: IOrdersHistory[];
}

export interface IReport {
  id: number;
  type: EReportTypes;
  sum: number;
  description: string;
  created: string;
}

export interface IReportForCreate {
  type: EReportTypes;
  sum: number;
  description: string;
}

export enum EOrderPositionOperation {
  CREATE = "create",
  REMOVE = "remove",
}

interface IOrderPositionHistory {
  logs: {
    id: number;
    operation: EOrderPositionOperation;
    updated: Date;
  }[];
}

export interface IOrdersHistory {
  orderPositions: IOrderPositionHistory[];
}
