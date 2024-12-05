import { colors } from '@/styles/colors';
import type { RefObject } from 'react'
import { TextInput, type TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
    inputRef?: RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: InputProps) {
    return (
        <TextInput
            ref={inputRef}
            className="w-full flex-1 min-h-14 max-h-14 bg-gray-700 text-white text-base font-regular rounded-md p-4"
            placeholderTextColor={colors.gray[300]}
            {...rest}
        />
    );
}
