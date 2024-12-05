import { Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import clsx from 'clsx';

type FilterProps = TouchableOpacityProps & {
    isActive?: boolean;
    title: string;
};

export function Filter({ title, isActive = false, ...rest }: FilterProps) {
    return (
        <TouchableOpacity
            className={clsx(
                'rounded-sm mr-3 h-[38px] w-[70px] items-center justify-center',
                {
                    'border border-green-700': isActive,
                    'border-transparent': !isActive,
                }
            )}
            {...rest}
        >
            <Text
                className={clsx(
                    'uppercase font-bold text-sm',
                    {
                        'text-white': true
                    }
                )}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
