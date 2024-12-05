import { Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import { Users } from 'lucide-react-native'
import { colors } from '@/styles/colors'

type GroupCardProps = TouchableOpacityProps & {
    title: string
}
export function GroupCard({ title, ...rest }: GroupCardProps) {
    return (
        <TouchableOpacity className='w-full h-[96px] bg-gray-500 rounded-md flex-row items-center gap-5 py-8 px-6' {...rest}>
            <Users size={32} color={colors.green[700]} fontWeight={'fill'} />
            <Text className='text-base text-gray-200 font-regular'>{title}</Text>
        </TouchableOpacity>
    )
}