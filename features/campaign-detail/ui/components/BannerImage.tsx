import { Box } from "@/components/ui/box";
import React from "react";
import { ImageBackground } from "react-native";

interface BannerImageProps {
  imageUrl: string | number;
  title?: string;
  height?: number; 
}

const BannerImage: React.FC<BannerImageProps> = ({ imageUrl, title, height = 200 }) => {
  return (
    <Box className="w-full">
      <ImageBackground
        source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
        style={{ width: "100%", height }}
        resizeMode="cover"
      >
        <Box className="w-full h-full justify-center items-center px-4">
          {/* <VStack className="items-center space-y-2">
            {title && (
              <Text className="text-white text-2xl md:text-4xl font-bold text-center">
                {title}
              </Text>
            )}
          </VStack> */}
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default BannerImage;
