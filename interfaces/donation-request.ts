import { IBase } from "./base";
import { BloodGroup, BloodRh } from "./blood";
import { ICampaignData } from "./campaign";
import { IUserData } from "./user";

export enum RequestStatus {
  pending = "pending",
  completed = "completed",
  rejected = "rejected",
  result_returned = "result_returned",
  appointment_confirmed = "appointment_confirmed",
  appointment_cancelled = "appointment_cancelled",
  appointment_absent = "appointment_absent",
  customer_cancelled = "customer_cancelled",
  customer_checked_in = "customer_checked_in",
}

export interface IDonationRequestData {
    id: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    donor: IUserData | null;
    note: string | null;
    campaign: ICampaignData | null;
    currentStatus: RequestStatus | null;
    appointmentDate: string | null;
}
export interface ICreateDonationRequestPayload {
  campaignId: string;
  appointmentDate: string;
  note: string;
}
export type IDonationRequest = IBase<IDonationRequestData>;
export type IDonationRequestHistory = IBase<IDonationRequestData[]>;

export interface IDonationRequestResult {
  id: string;
  campaignDonation: {
    id: string;
    currentStatus: string;
    donor: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  volumeMl: number;
  bloodGroup: BloodGroup;
  bloodRh: BloodRh;
  notes: string;
  rejectReason: string;
  status: "rejected" | "completed";
  processedBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}