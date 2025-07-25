import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetStatistics } from "@/features/home/hooks";

const HomeBanner = () => {
  const { statistics, isLoading, isError } = useGetStatistics();

  return (
    <Box className="bg-red-700 text-white px-4 py-5 text-center w-full">
      <VStack className="items-center space-y-4">
        <Text className="text-white/90 text-2xl md:text-4xl font-bold">
          Hiến máu - Cứu người
        </Text>
        <Text className="text-sm md:text-lg text-white/90 max-w-lg text-center mt-2">
          Tham gia các chiến dịch hiến máu tình nguyện để sẻ chia sự sống, lan tỏa yêu thương.
        </Text>

        <HStack className="flex w-full max-w-2xl bg-white/10 backdrop-blur-sm mt-6 px-6 py-4 rounded-xl">
          {isLoading ? (
            <VStack className="flex-1 items-center py-4">
              <Spinner size="large" className="text-white" />
              <Text className="text-sm text-white/80 mt-2">Đang tải thống kê...</Text>
            </VStack>
          ) : isError ? (
            <VStack className="flex-1 items-center py-4">
              <Text className="text-sm text-white/80">Không thể tải thống kê</Text>
            </VStack>
          ) : (
            <>
              <VStack className="flex-1 items-center">
                <Text className="text-2xl font-bold text-white">
                  {statistics?.totalBloodDonated?.toLocaleString() || 0}
                </Text>
                <Text className="text-sm text-white/80">Số (ml) máu đã được hiến</Text>
              </VStack>
              <VStack className="flex-1 items-center">
                <Text className="text-2xl font-bold text-white">
                  {statistics?.totalCampaigns || 0}
                </Text>
                <Text className="text-sm text-white/80">Chiến dịch</Text>
              </VStack>
            </>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default HomeBanner;
