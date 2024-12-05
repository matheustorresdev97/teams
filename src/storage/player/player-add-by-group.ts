import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '../storage-config'

type PlayerProps = {
    name: string
    team: string
}

export async function playerAddByGroup(
    newPlayer: PlayerProps,
    group: string
) {
    try {
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, '')
    } catch (error) {
        throw error
    }
}