import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@/utils/app-error'
import { GROUP_COLLECTION } from '../storage-config'
import { groupGetAll } from './group-get-all'

export async function groupCreate(newGroup: string) {
    try {
        const storedGroups = await groupGetAll()

        const groupAlreadyExists = storedGroups.includes(newGroup)

        if (groupAlreadyExists)
            throw new AppError('Já existe uma turma com esse nome.')

        const storage = JSON.stringify([...storedGroups, newGroup])

        await AsyncStorage.setItem(GROUP_COLLECTION, storage)
    } catch (error) {
        throw error
    }
}