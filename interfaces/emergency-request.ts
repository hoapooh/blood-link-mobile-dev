import { IBase } from "./base";

export enum EmergencyRequestStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export enum BloodTypeComponent {
  plasma = "plasma",
  red_cells = "red_cells",
  platelets = "platelets",
  whole_blood = "whole_blood",
}

export interface IBloodType {
  group: string;
  rh: string;
}

export interface IBloodUnit {
  id: string;
  createdAt: string;
  updatedAt: string;
  member: string;
  bloodType: {
    group: string;
    rh: string;
  };
  bloodVolume: number;
  bloodComponentType: string;
  remainingVolume: number;
  isSeparated: boolean;
  parentWholeBlood: string;
  expiredDate: string;
  status: string;
}

export interface IEmergencyRequestData {
  id: string;
  requiredVolume: number;
  usedVolume?: number;
  bloodType: IBloodType;
  bloodTypeComponent: BloodTypeComponent;
  bloodUnit?: IBloodUnit | null;
  status: EmergencyRequestStatus;
  description: string;
  rejectionReason: string | null;
  startDate: string;
  endDate: string;
  wardCode: string;
  districtCode: string;
  provinceCode: string;
  wardName: string;
  districtName: string;
  provinceName: string;
  longitude: string;
  latitude: string;
  createdAt: string;
  updatedAt: string;
  requestedBy?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    role: string;
  };
}

export interface IEmergencyRequestMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IEmergencyRequestResponse {
  data: IEmergencyRequestData[];
  meta: IEmergencyRequestMeta;
}

export type IEmergencyRequestList = IBase<IEmergencyRequestResponse>;
export type IEmergencyRequestDetail = IBase<IEmergencyRequestData>;
