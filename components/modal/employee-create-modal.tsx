import { View, } from 'react-native'
import React from 'react'
import Modal from '../shared/modal'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import EmployeeCreateForm from '../form/employee-create-form'

const EmployeeCreateModal = () => {
    return (
        <Modal
            open
            onOpenChange={() => { }}
            title="Create Employee"
            description="Fill the following fields"
            isWithoutHeader={false}
        >
            <EmployeeCreateForm />
        </Modal>
    )
}

export default EmployeeCreateModal