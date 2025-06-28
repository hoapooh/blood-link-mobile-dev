import { IBase } from "./base";
import { ICampaignData } from "./campaign";
import { IUserData } from "./user";

export enum RequestStatus {
  pending = "pending",
  approved = "approved",
  completed = "completed",
  rejected = "rejected",
  canceled = "canceled",
  failed = "failed",
}

export interface IDonationRequestData {
    id: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    donor: IUserData | null;
    campaign: ICampaignData | null;
    currentStatus: RequestStatus | null;
}
export interface ICreateDonationRequestPayload {
  campaignId: string;
  // appointmentDate: string;
  // note: string;
}
export type IDonationRequest = IBase<IDonationRequestData>;
export type IDonationRequestHistory = IBase<IDonationRequestData[]>;