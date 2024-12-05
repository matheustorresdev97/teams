import { colors } from '@/styles/colors';
import { TextInput, type TextInputProps } from 'react-native';

export function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput
            className="flex-1 min-h-14 max-h-14 bg-gray-700 text-white text-base font-regular rounded-md p-4"
            placeholderTextColor={colors.gray[300]}
            {...rest}
        />
    );
}
