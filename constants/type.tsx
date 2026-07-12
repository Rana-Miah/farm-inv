import { APP_SETTINGS_TAB, USER_SETTINGS_TAB } from ".";

export type SettingsTab = typeof APP_SETTINGS_TAB | typeof USER_SETTINGS_TAB
export type DirectoryPermission = {
    directoryUri: string;
    granted: boolean;
}