import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BadgeCheck, Clock, ShieldCheck } from "lucide-react-native";

const Introduction = () => {
  return (
    <Box className="bg-white text-black px-4 py-10 text-center w-full">
      <VStack className="items-center">
        <Text className="text-black/90 text-xl md:text-4xl font-bold">
          About Our Facility
        </Text>
        <Text className="text-sm md:text-lg text-center text-black/90 max-w-lg py-5">
          We are a state-of-the-art medical facility dedicated to blood donation and transfusion services. With over 20 years of experience, we ensure the highest safety standards.
        </Text>

        <HStack className="flex w-full max-w-2xl mt-6 rounded-xl justify-center items-center">
          <VStack className="flex-1 items-center space-y-2">
            <Box className="bg-red-100 rounded-full p-3">
              <ShieldCheck color="red" size={24} />
            </Box>
            <Text className="text-sm text-black">Safe & Secure</Text>
          </VStack>

          <VStack className="flex-1 items-center space-y-2">
            <Box className="bg-red-100 rounded-full p-3">
              <Clock color="red" size={24} />
            </Box>
            <Text className="text-sm text-black">24/7 Service</Text>
          </VStack>

          <VStack className="flex-1 items-center space-y-2">
            <Box className="bg-red-100 rounded-full p-3">
              <BadgeCheck color="red" size={24} />
            </Box>
            <Text className="text-sm text-black">Certified</Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Introduction;
