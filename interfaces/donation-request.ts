import { IBase } from "./base";
import { ICampaignData } from "./campaign";
import { IUserData } from "./user";

export enum RequestStatus {
  pending = "pending",
  completed = "completed",
  rejected = "rejected",
}
export interface IDonationRequestData {
    id: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    donor: IUserData | null;
    campaign: ICampaignData | null;
    currentStatus: RequestStatus | null;
}
export type IDonationRequest = IBase<IDonationRequestData>;
export type IDonationRequestHistory = IBase<IDonationRequestData[]>;