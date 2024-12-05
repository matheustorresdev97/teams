import { useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { Input } from "@/components/input";
import { ButtonIcon } from "@/components/button-icon";
import { Filter } from "@/components/filter";
import { PlayerCard } from "@/components/player-card";
import { ListEmpty } from "@/components/list-empty";
import { Button } from "@/components/button";
import { useLocalSearchParams } from "expo-router";
import { AppError } from "@/utils/app-error";
import { playerAddByGroup } from "@/storage/player/player-add-by-group";



export default function Players() {
    const { group } = useLocalSearchParams<{ group: string }>();

    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<string[]>([])

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert(
                'Nova pessoa',
                'Informe o nome da pessoa para adicionar.'
            )
        }
        const newPlayer = {
            name: newPlayerName,
            team,
        }
        try {
            await playerAddByGroup(newPlayer, group)
            setNewPlayerName('')
        } catch (error) {
            console.log(error)
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message)
            } else {
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
        }
    }

    return (
        <View className="flex-1 bg-gray-600 p-6">
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />

            <View className="w-full bg-gray-700 flex-row justify-center rounded-md">
                <Input
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    placeholder="Nome do participante"
                    autoCorrect={false}
                />
                <ButtonIcon icon="add" onPress={handleAddPlayer} />
            </View>

            <View className="w-full flex-row items-center mt-8 mx-0 mb-3">
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <Text className="text-gray-200 font-bold text-sm">
                    {players.length}
                </Text>
            </View>

            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard name={item} onRemove={() => { }} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length <= 0 && { flex: 1 },
                ]}
                ListEmptyComponent={<ListEmpty message="Não há pessoas neste time" />}
            />

            <Button title="Remover turma" type="secondary" />
        </View>
    )
}