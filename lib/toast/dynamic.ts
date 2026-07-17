import Toast from "react-native-toast-message"

export const showDynamicToast = (msg: string, success: boolean) => {
    Toast.show({
        type: success ? 'success' : 'error',
        text1: msg
    })
}
