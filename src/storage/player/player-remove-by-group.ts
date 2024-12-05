import AsyncStorage from '@react-native-async-storage/async-storage'
import { playersGetByGroup } from './players-get-by-group'
import { PLAYER_COLLECTION } from '../storage-config'

export async function playerRemoveByGroup(playerName: string, group: string) {
    try {
        const storage = await playersGetByGroup(group)
        const filteredPlayers = storage.filter(player => player.name !== playerName)
        const players = JSON.stringify(filteredPlayers)
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)
    } catch (error) {
        throw error
    }
}