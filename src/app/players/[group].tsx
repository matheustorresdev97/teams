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
import { Loading } from '@/components/loading';
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppError } from "@/utils/app-error";
import { playerAddByGroup, PlayerProps } from "@/storage/player/player-add-by-group";
import { playersGetByGroupAndTeam } from "@/storage/player/players-get-by-group-and-team";
import { playerRemoveByGroup } from '@/storage/player/player-remove-by-group';
import { groupRemoveByName } from '@/storage/group/group-remove-by-name';




export default function Players() {
    const { group } = useLocalSearchParams<{ group: string }>();
    const router = useRouter();

    const newPlayerNameInputRef = useRef<TextInput>(null)

    const [isLoading, setIsLoading] = useState(false)
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
            setIsLoading(true)

            const playersByTeam = await playersGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)
        } catch (error) {
            console.log(error)
            Alert.alert(
                'Pessoas',
                'Nao foi possível carregar as pessoas do time selecionado.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()
        } catch (error) {
            console.log(error)
            Alert.alert('Remover pessoa', 'Nao foi possível remover essa pessoa.')
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group)
            router.push('/')
        } catch (error) {
            console.log(error)
            Alert.alert('Remover turma', 'Nao foi possivel remover a turma.')
        }
    }

    async function handleGroupRemove() {
        Alert.alert('Remover', 'Deseja remover a turma?', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => groupRemove() },
        ])
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

            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <PlayerCard
                            name={item.name}
                            onRemove={() => {
                                handleRemovePlayer(item.name)
                            }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length <= 0 && { flex: 1 },
                    ]}
                    ListEmptyComponent={<ListEmpty message="Não há pessoas neste time" />}
                />
            )}

            <Button
                title="Remover turma"
                type="secondary"
                onPress={handleGroupRemove}
            />
        </View>
    )
}