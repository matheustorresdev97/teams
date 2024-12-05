import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';

export type ButtonIconStyleProps = 'primary' | 'secondary';

type ButtonIconProps = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconStyleProps;
};

export function ButtonIcon({ type = 'primary', icon, ...rest }: ButtonIconProps) {
    return (
        <TouchableOpacity
            className="w-14 h-14 justify-center items-center ml-3"
            {...rest}
        >
            <MaterialIcons
                name={icon}
                size={24}
                color={type === 'primary' ? colors.green[500] : colors.red[400]}
            />
        </TouchableOpacity>
    );
}
