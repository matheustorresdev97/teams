import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '../storage-config'
import { PlayerProps } from './player-add-by-group'

export async function playersGetByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)
    const players: PlayerProps[] = storage ? JSON.parse(storage) : []
    return players
  } catch (error) {
    throw error
  }
}