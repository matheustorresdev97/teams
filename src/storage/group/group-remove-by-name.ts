import AsyncStorage from '@react-native-async-storage/async-storage'
import { groupGetAll } from './group-get-all'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../storage-config'

export async function groupRemoveByName(groupName: string) {
    try {
        const storedGroups = await groupGetAll()
        const filteredGroups = storedGroups.filter(group => group !== groupName)
        const groups = JSON.stringify(filteredGroups)
        await AsyncStorage.setItem(GROUP_COLLECTION, groups)
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)
    } catch (error) {
        throw error
    }
}