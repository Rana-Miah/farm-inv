import * as FileSystem from 'expo-file-system';
import * as FileSystemLegacy from 'expo-file-system/legacy';
import Toast from 'react-native-toast-message';
import { getNonStringStoredData, getStoredData, storeData } from '@/lib/async-storage';
import { DIRECTORY_PERMISSION_KEY, FILE_URI_KEY } from '@/constants';
import { DirectoryPermission } from '@/constants/type';

export const getFolderAccessPermission = async () => {
    const permission = await FileSystemLegacy.StorageAccessFramework.requestDirectoryPermissionsAsync()
    console.log('permission', permission)
    if (!permission.granted) {
        return Toast.show({
            type: 'error',
            text1: 'Permission Denied',
            text2: 'You need to grant permission to access the folder.'
        })
    }

    storeData<DirectoryPermission>({
        key: DIRECTORY_PERMISSION_KEY,
        isStringValue: false,
        value: {
            directoryUri: permission.directoryUri,
            granted: permission.granted
        }
    })
}

export const hasPermission = async (key: string) => {
    const permission = await getNonStringStoredData<DirectoryPermission>(key)
    return permission?.granted ?? false
}


const checkUpdated = (lastModified: number) => {
    const current = new Date().getTime()
    return lastModified > current
}



export const importDb = async () => {

    const storedFileUri = await getStoredData(FILE_URI_KEY)
    // const storedFileUri = false

    if (!storedFileUri) {

        const file = await FileSystem.File.pickFileAsync()
        if (file.canceled) return Toast.show({
            type: 'error',
            text1: 'Please select the farm.db file',
            text2: 'Inside database folder'
        })

        if (file.result.exists) {
            storeData({
                key: FILE_URI_KEY,
                value: file.result.uri,
                isStringValue: true
            })
        }
        if (!file.result.lastModified) return

        const isUpdateDb = checkUpdated(file.result.lastModified)

        if (!isUpdateDb) return Toast.show({
            type: 'error',
            text1: 'Database file not updated!'
        })
        return
    }

    const file = new FileSystem.File(storedFileUri)

    if (!file.exists) return Toast.show({
        type: 'error',
        text1: 'Database file is missing!'
    })

    if (!file.lastModified) return

    const isUpdated = checkUpdated(file.lastModified)

    if (!isUpdated) return Toast.show({
        type: 'error',
        text1: 'Database file not updated!'
    })

    await copyFile(file)
}

export const copyFile = async (sourceFile: FileSystem.File) => {
    const destination = new FileSystem.File(FileSystem.Paths.document, sourceFile.name)
    if (destination.exists) {
        destination.delete()
    }
    await sourceFile.copy(destination)
    Toast.show({ type: 'success', text1: 'Database imported!' })
}