import { View } from 'react-native'

import React from 'react'
import Container from '@/components/shared/container'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { getFiles } from '@/lib/expo-file-system/get-files'

const Files = () => {

    return (
        <Container>
            <Button onPress={getFiles} >
                <Text className='text-white'>Files</Text>
            </Button>
        </Container>
    )
}

export default Files