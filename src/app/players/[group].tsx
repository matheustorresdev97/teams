import { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, Text, TextInput, View } from "react-native";
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
import { playerAddByGroup, PlayerProps } from "@/storage/player/player-add-by-group";
import { playersGetByGroupAndTeam } from "@/storage/player/players-get-by-group-and-team";



export default function Players() {
    const { group } = useLocalSearchParams<{ group: string }>();

    const newPlayerNameInputRef = useRef<TextInput>(null)

    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerProps[]>([])

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

            newPlayerNameInputRef.current?.blur()

            setNewPlayerName('')
            fetchPlayersByTeam()
        } catch (error) {
            console.log(error)
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message)
            } else {
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)
        } catch (error) {
            console.log(error)
            Alert.alert(
                'Pessoas',
                'Nao foi possível carregar as pessoas do time selecionado.'
            )
        }
    }

    useEffect(() => {
        fetchPlayersByTeam()
    }, [team])

    return (
        <View className="flex-1 bg-gray-600 p-6">
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />

            <View className="w-full bg-gray-700 flex-row justify-center rounded-md">
                <Input
                    inputRef={newPlayerNameInputRef}
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    placeholder="Nome do participante"
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
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
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard name={item.name} onRemove={() => { }} />
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