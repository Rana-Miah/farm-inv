import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView, Edge } from 'react-native-safe-area-context'

const Container = ({ children, edges }: { children: React.ReactNode, edges?: Edge[] }) => {
    return (
        <SafeAreaView edges={edges} className='flex-1 px-1.5'>
            {children}
        </SafeAreaView>
    )
}

export default Container