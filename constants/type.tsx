import { APP_SETTINGS_TAB, USER_SETTINGS_TAB } from "./variables";

export type SettingsTab = typeof APP_SETTINGS_TAB | typeof USER_SETTINGS_TAB
export type StoredDirectoryInfo = {
    directoryUri: string;
    directoryName: string;
}
export type StoredFileInfo = {
    fileUri: string;
    fileName: string;
}