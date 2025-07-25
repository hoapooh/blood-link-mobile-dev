export interface IStatisticsData {
  totalCampaigns: number;
  totalBloodDonated: number;
  totalBloodUnits: number;
}

export interface IStatisticsResponse {
  success: boolean;
  message: string;
  data: IStatisticsData;
}
