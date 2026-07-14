import { View, } from 'react-native'
import React from 'react'
import Modal from '../shared/modal'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import EmployeeCreateForm from '../form/employee-create-form'
import { useModal, useModalAction } from '@/hooks/redux/use-modal'

const EmployeeCreateModal = () => {
    const { isOpen, type } = useModal()
    const { onClose } = useModalAction()
    const open = isOpen && type === 'EMPLOYEE_CREATE_MODAL'
    return (
        <Modal
            open={open}
            onOpenChange={onClose}
            title="Create Employee"
            description="Fill the following fields"
            isWithoutHeader={false}
        >
            <EmployeeCreateForm />
        </Modal>
    )
}

export default EmployeeCreateModal