import Toast from "react-native-toast-message"

export const showDynamicToast = (success: boolean, msg1: string, msg2?: string) => {
    Toast.show({
        type: success ? 'success' : 'error',
        text1: msg1,
        text2: msg2,
        visibilityTime: 1000
    })
}
