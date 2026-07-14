import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/lib/redux/store'

type ReduxStoreProviderProp = {
    children: React.ReactNode
}
const ReduxStoreProvider = ({ children }: ReduxStoreProviderProp) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxStoreProvider