import { View } from "react-native";
import { colors } from "@/styles/colors";
import { Users } from "lucide-react-native";
import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { Button } from "@/components/button";



export default function NewGroup() {
    return (
        <View className="flex-1 bg-gray-600 p-6">
            <Header showBackButton />

            <View className="flex-1 justify-center items-center">
                <Users size={56} color={colors.green[700]} className="self-center" />

                <Highlight
                    title="Nova Turma"
                    subtitle="Crie a turma para adicionar as pessoas"
                />

                <Button title="Criar" />
            </View>
        </View>
    )
}