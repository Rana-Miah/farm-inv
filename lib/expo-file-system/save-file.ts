import { DIRECTORY_PERMISSION_KEY } from "@/constants";
import { StoredDirectoryInfo } from "@/constants/type";
import { Directory } from "expo-file-system";
import * as dateFns from 'date-fns'
import { getNonStringStoredData } from "../async-storage";
import { directoryPicker, getDirectory } from "@/lib/expo-file-system/directory-picker";
import { getSavedItems } from "@/dal/item/get-item-save-file";
import { showError } from "../toast/error";
import { showSuccess } from "../toast/success";


function generateFileName(prefix: string) {
    const now = new Date();

    return `${prefix}_${dateFns.format(now, 'ddMMyyyy_hhmmss aaa')}.txt`;
}



function createTextFile(
    directory: Directory,
    fileName: string,
    content: string
) {
    const file = directory.createFile(fileName, "text/plain");

    file.write(content, {
        append: true,
    });
}

const generateInventoryContent = (items: NonNullable<Awaited<ReturnType<typeof getSavedItems>>['data']>['scannedItems']) => {

    const content = items.map(item => {
        return `${item.barcode}|${item.quantity}`
    }).join('\n')

    return content
}
type Item = NonNullable<Awaited<ReturnType<typeof getSavedItems>>['data']>['scannedItems'][number] & { pFlag: 'P' | 'R' | null }
const generateTagsContent = (items: Item[]) => {

    const promoItems = items.filter(item => item.pFlag === 'P')
    const regularItems = items.filter(item => item.pFlag === 'R')


    const promoContent = promoItems.map(item => {
        return `${item.barcode}|${item.quantity}`
    }).join('\n')
    const regularContent = regularItems.map(item => {
        return `${item.barcode}|${item.quantity}`
    }).join('\n')

    return {
        promoContent,
        regularContent
    }
}



export async function saveFile(prefix: string) {
    try {
        const res = await getSavedItems()
        if (!res.data) return showError('Failed to get items to save')

        const contentFn = {
            tags: generateTagsContent,
            inventory: generateInventoryContent
        }

        const fn = contentFn['inventory'](res.data.scannedItems)

        let content: string

        content = generateInventoryContent(res.data.scannedItems)

        const directory = await getDirectory();

        if (!directory) {
            return;
        }

        const fileName = generateFileName(prefix);

        createTextFile(directory, fileName, content);

        showSuccess("File saved!");
    } catch (error) {
        console.error(error);
        showError("Failed to save file.");
    }
}