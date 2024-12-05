import { Text, View } from "react-native"

type HighlightProps = {
    title: string
    subtitle: string
}
export function Highlight({ title, subtitle }: HighlightProps) {
    return (
        <View className="w-full my-8 mx-0">
            <Text className="text-center text-lg font-bold text-white">{title}</Text>
            <Text className="text-center text-base font-regular text-gray-300">{subtitle}</Text>
        </View>
    )
}