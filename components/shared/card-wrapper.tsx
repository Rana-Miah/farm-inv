
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { View } from 'react-native'

type CardWrapperProp = {
    title: string | React.ReactNode
    description: string | React.ReactNode
    children: React.ReactNode
    footerContent?: React.ReactNode
    headerContent?: React.ReactNode
}


const CardWrapper = ({ title, description, children, footerContent, headerContent }: CardWrapperProp) => {
    return (
        <Card>
            <CardHeader className='flex-row justify-between'>
                <View className='gap-1'>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </View>
                {headerContent && <View>{headerContent}</View>}
            </CardHeader>
            <CardContent>{children}</CardContent>
            {footerContent && <CardFooter>{footerContent}</CardFooter>}
        </Card>
    )
}

export default CardWrapper