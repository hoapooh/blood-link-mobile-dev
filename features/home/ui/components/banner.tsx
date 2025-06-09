import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const HomeBanner = () => {
  return (
    <Box className="bg-red-500 text-white px-4 py-5 rounded-xl text-center w-full">
      <VStack className="items-center space-y-4">
        <Text className="text-white/90 text-2xl md:text-4xl font-bold">
          Save Lives Today
        </Text>
        <Text className="text-sm md:text-lg text-white/90 max-w-lg">
          Join our blood donation campaigns and make a difference
        </Text>

        <HStack className="bg-white/10 backdrop-blur-sm mt-6 px-6 py-4 rounded-xl justify-between w-full max-w-2xl space-x-4">
          <VStack className="items-center">
            <Text className="text-2xl font-bold text-white">247</Text>
            <Text className="text-sm text-white/80">Lives Saved</Text>
          </VStack>
          <VStack className="items-center">
            <Text className="text-2xl font-bold text-white">15</Text>
            <Text className="text-sm text-white/80">Active Campaigns</Text>
          </VStack>
          <VStack className="items-center">
            <Text className="text-2xl font-bold text-white">892</Text>
            <Text className="text-sm text-white/80">Donors</Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default HomeBanner;
