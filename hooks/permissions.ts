import { DIRECTORY_PERMISSION_KEY } from "@/constants"
import { DirectoryPermission } from "@/constants/type"
import { getNonStringStoredData, getStoredData } from "@/lib/async-storage"
import { storageEvent } from "@/lib/even-emitter/storage-event"

import * as FileSystem from 'expo-file-system'
import { useEffect, useState } from "react"

export const usePermission = () => {
    const [state, setState] = useState<DirectoryPermission>({ directoryUri: "", granted: false })
    const load = async () => {
        const storedData = await getNonStringStoredData<DirectoryPermission>(DIRECTORY_PERMISSION_KEY)
        setState(storedData ?? { directoryUri: "", granted: false })
    }

    useEffect(() => {

        load()
        storageEvent.on('permissionChanged', load)
        return () => {
            storageEvent.off('permissionChanged', load)
        }
    }, [setState])
    return state
}

export const useFile = (key: string) => {
    const [file, setFile] = useState<FileSystem.File>()
    const loadFile = async () => {
        const storedData = await getStoredData(key)
        if (!storedData) return

        const file = new FileSystem.File(storedData)
        if (file.exists) {
            setFile(file)
        }
    }

    useEffect(() => { loadFile() }, [])
    return file
}