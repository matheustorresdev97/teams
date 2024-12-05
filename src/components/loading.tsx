import { colors } from "@/styles/colors";
import { ActivityIndicator, View } from "react-native";

export function Loading() {
    return (
        <View className="flex-1 items-center justify-center bg-gray-600">
            <ActivityIndicator size={64} color={colors.green[700]} />
        </View>
    )
}