import { StoredDirectoryInfo } from "@/constants/type"
import { getNonStringStoredData } from "../async-storage"
import { DIRECTORY_PERMISSION_KEY } from "@/constants"
import { directoryPicker } from "./directory-picker"
import { Directory } from "expo-file-system"
import { showError } from "../toast/error"

export const getFiles = async () => {
    try {
        const persistDirectoryUri = await getNonStringStoredData<StoredDirectoryInfo>(DIRECTORY_PERMISSION_KEY)
        let directory: Directory | null = null
        if (persistDirectoryUri) {
            directory = new Directory(persistDirectoryUri?.directoryUri)
        } else {
            directory = await directoryPicker()
        }


        if (!directory) {
            showError('Directory is missing')
            return
        }
        const documents = directory.list()
        console.log(documents, { depth: null })

    } catch (error) {
        console.log('Filed to get files', error);
    }
}