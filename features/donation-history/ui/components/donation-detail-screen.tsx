import { DonationDetail } from "@/features/donation-history/ui/components";
import React from "react";

interface DonationDetailScreenProps {
  donationId: string;
}

const DonationDetailScreen: React.FC<DonationDetailScreenProps> = ({ donationId }) => {
  return <DonationDetail donationId={donationId} />;
};

export default DonationDetailScreen;
