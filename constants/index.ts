import { saveOrder } from "@/lib/utils"

export const APP_SETTINGS_TAB = 'app-settings' as const
export const USER_SETTINGS_TAB = 'user-settings' as const

export const SETTINGS_TABS = [APP_SETTINGS_TAB, USER_SETTINGS_TAB] as const


export const DIRECTORY_PERMISSION_KEY = 'directory-permission' as const
export const FILE_URI_KEY = 'file-uri' as const

export const ORDER_NAME = [
    {
        name: 'Kwh',
        onPress: saveOrder
    },
    {
        name: 'Veg',
        onPress: saveOrder
    },
    {
        name: 'Louziano',
        onPress: saveOrder
    },
    {
        name: 'Meat',
        onPress: saveOrder
    },
    {
        name: 'Direct',
        onPress: saveOrder
    },
]
export const SAVE_NAME = [
    {
        name: 'Inventory',
        onPress: saveOrder
    },
    {
        name: 'Shelf Tags',
        onPress: saveOrder
    }
]