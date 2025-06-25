import { IBase } from "./base";

export enum CampaignStatus {
  active = "active",
  not_started = "not_started",
  ended = "ended",
}

// Interface for a single campaign item
export interface ICampaignData {
	id: string;
	name: string;
	description: string;
	startDate: string; // ISO format expected (e.g. "2025-06-10T00:00:00Z")
	endDate: string;
	status: CampaignStatus ; // Use the enum
	banner: string;
	location: string;
	limitDonation: number;
	bloodCollectionDate: string; // ISO format expected (e.g. "2025-06-10T00:00:00Z")
	createdAt: string | null;
	updatedAt: string | null;
}

// Interface with metadata for paginated campaign responses
export interface ICampaignMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}


export type ICampaignList = IBase<ICampaignData[]>;
export type ICampaignDetail = IBase<ICampaignData>;
export type ICampaignPagination = IBase<ICampaignMeta>;