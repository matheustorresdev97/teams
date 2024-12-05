import { TouchableOpacity, Text, type TouchableOpacityProps } from 'react-native';
import clsx from 'clsx';

export type ButtonTypeStyleProps = 'primary' | 'secondary';

type ButtonProps = TouchableOpacityProps & {
    type?: ButtonTypeStyleProps;
    title: string;
};

export function Button({ type = 'primary', title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            className={clsx(
                'flex-1 min-h-[56px] max-h-[56px] rounded-md justify-center items-center',
                {
                    'bg-green-700': type === 'primary',
                    'bg-red-700': type === 'secondary',
                }
            )}
            {...rest}
        >
            <Text className="text-md text-white font-bold">{title}</Text>
        </TouchableOpacity>
    );
}
