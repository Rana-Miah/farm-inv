import { View, } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import CardWrapper from '@/components/shared/card-wrapper';
import EmployeeUpdateForm from '@/components/form/employee-update-form';
import Container from '@/components/shared/container';

const EmployeeDetails = () => {
    const { empId } = useLocalSearchParams<{ empId: string }>();
    return (
        <Container>
            <CardWrapper
                title="Update Employee Form"
                description="Edit that field want to update"
                headerContent={
                    <Button
                        size={'sm'}
                        onPress={() => { console.log('pressed') }}
                    >
                        <Text>Change Password</Text>
                    </Button>
                }
            >
                <EmployeeUpdateForm employee={{
                    employeeId: "50667",
                    employeeTitle: "EDP",
                    name: "RANA"
                }} />
            </CardWrapper>
        </Container>
    )
}

export default EmployeeDetails
