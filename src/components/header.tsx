import { Image, View } from "react-native";

export function Header() {
    return (
        <View className="w-full flex-row items-center justify-center">
            <Image source={require("@/assets/logo.png")} width={46} height={55} />
        </View>
    )
}