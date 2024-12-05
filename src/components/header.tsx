import { Image, TouchableOpacity, View } from "react-native";
import { MoveLeft } from 'lucide-react-native';

type HeaderProps = {
    showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
    return (
        <View className="w-full flex-row items-center justify-center">
            {showBackButton && (
                <TouchableOpacity className="flex-1">
                    <MoveLeft color='#fff' size={32} />
                </TouchableOpacity>
            )}
            <Image source={require("@/assets/logo.png")} width={46} height={55} />
        </View>
    )
}