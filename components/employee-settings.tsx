import { View, } from 'react-native'
import React from 'react'
import { Button } from './ui/button'
import { useModalAction } from '@/hooks/redux/use-modal'
import { MODAL_TYPE } from '@/constants'
import { Text } from './ui/text'

const EmployeeSettings = () => {
    const { onOpen } = useModalAction()
    return (
        <View>
            <Button onPress={() => onOpen(MODAL_TYPE.EMPLOYEE_CREATE_MODAL)}>

                <Text>Add New Employee</Text>
            </Button>
        </View>
    )
}

export default EmployeeSettings