import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '../storage-config'
import { playersGetByGroup } from './players-get-by-group'
import { AppError } from '@/utils/app-error'

export type PlayerProps = {
    name: string
    team: string
}

export async function playerAddByGroup(
    newPlayer: PlayerProps,
    group: string
) {
    try {
        const players = await playersGetByGroup(group)
        const playerAlreadyExists = players.some(
            player => player.name === newPlayer.name
        )
        if (playerAlreadyExists)
            throw new AppError('Essa pessoa já está adicionada em um time aqui.')
        const storage = JSON.stringify([...players, newPlayer])
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
    } catch (error) {
        throw error
    }
}