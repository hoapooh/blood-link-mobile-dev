export interface IReminderData {
  id: string;
  createdAt: string;
  updatedAt: string;
  donor: string;
  message: string;
  type: "before_donation" | "after_donation";
  metadata: {
    donationDate?: string;
    nextEligibleDate?: string;
    location?: string;
    campaignName?: string;
    appointmentDate?: string;
  };
  campaignDonation: string;
}

export interface ICampaignDonationData {
  id: string;
  createdAt: string;
  updatedAt: string;
  campaign: {
    id: string;
    name: string;
    description: string;
    location: string;
    bloodCollectionDate: string;
  };
  donor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  currentStatus: string;
  appointmentDate: string;
}

export interface IRemindersResponse {
  success: boolean;
  message: string;
  data: {
    campaignDonation: ICampaignDonationData;
    reminders: IReminderData[];
  };
}
