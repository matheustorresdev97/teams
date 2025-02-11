import { useState } from "react";
import { Alert, View } from "react-native";
import { colors } from "@/styles/colors";
import { Users } from "lucide-react-native";
import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRouter } from "expo-router";
import { groupCreate } from "@/storage/group/group-create";
import { AppError } from "@/utils/app-error";


export default function NewGroup() {
    const router = useRouter();

    const [group, setGroup] = useState('')

    async function handleNewGroup() {
        if (group.trim().length === 0) {
            return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
        }

        if (group.trim().length === 0) return
        try {
            await groupCreate(group)
            router.push(`/players/${group}`);
        } catch (error) {
            console.log(error)

            if (error instanceof AppError) {
                Alert.alert('Novo Grupo', error.message)
            } else {
                Alert.alert('Novo Grupo', 'Não foi possível criar o grupo.')
            }
        }

    }

    return (
        <View className="flex-1 bg-gray-600 p-6">
            <Header showBackButton />

            <View className="flex-1 justify-center items-center">
                <Users size={56} color={colors.green[700]} className="self-center" />

                <Highlight
                    title="Nova Turma"
                    subtitle="Crie a turma para adicionar as pessoas"
                />

                <Input
                    placeholder="Nome da turma"
                    value={group}
                    onChangeText={setGroup}
                />

                <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNewGroup} />
            </View>
        </View>
    )
}