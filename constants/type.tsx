import { APP_SETTINGS_TAB, USER_SETTINGS_TAB } from ".";

export type SettingsTab = typeof APP_SETTINGS_TAB | typeof USER_SETTINGS_TAB
export type StoredDirectoryInfo = {
    directoryUri: string;
    directoryName: string;
}
export type StoredFileInfo = {
    fileUri: string;
    fileName: string;
}


export type SuccessResponse<T> = {
    success: true;
    message: string;
    data: T;
};
export type FailureResponse = {
    success: false;
    message: string;
    data: null;
    errorCode?: string;
};

export type ActionResponse<T> = SuccessResponse<T> | FailureResponse;
export type ErrorCode =
    | "VALIDATION_ERROR"
    | "NOT_FOUND"
    | "DUPLICATE"
    | "DB_ERROR"
    | "UNKNOWN";
