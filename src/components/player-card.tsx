import { MaterialIcons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { ButtonIcon } from './button-icon'


type PlayerCardProps = {
    name: string
    onRemove: () => void
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
    return (
        <View className="w-full h-[56px] bg-gray-500 rounded-md flex-row items-center mb-4">
            <MaterialIcons name="person" size={24} color="#E0E0E0" className="ml-4 mr-1" />
            <Text className="flex-1 text-md text-gray-200 font-regular">{name}</Text>
            <ButtonIcon icon="close" type="secondary" onPress={onRemove} />
        </View>
    )
}
