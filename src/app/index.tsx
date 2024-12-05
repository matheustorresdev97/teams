import { View } from "react-native";
import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { Input } from "@/components/input";
import { ButtonIcon } from "@/components/button-icon";


export default function Players() {
    return (
        <View className="flex-1 bg-gray-600 p-6">
            <Header showBackButton />

            <Highlight
                title="Nova da Turma"
                subtitle="Adicione a galera e separe os times"
            />

            <View className="w-full bg-gray-700 flex-row justify-center rounded-md">
                <Input placeholder="Nome do participante" autoCorrect={false} />
                <ButtonIcon icon="add" />
            </View>

        </View>
    )
}