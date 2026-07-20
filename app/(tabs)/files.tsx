import { ScrollView, View } from 'react-native'

import React, { useEffect, useState } from 'react'
import Container from '@/components/shared/container'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { getFiles } from '@/lib/expo-file-system/get-files'
import { getDirectory } from '@/lib/expo-file-system/directory-picker'
import { Directory, File } from 'expo-file-system'
import { FileCard } from '@/components/shared/file-card'

const Files = () => {
    const [directory, setDirectory] = useState<Directory | null>(null)

    useEffect(() => {
        const loadDirectory = async () => {
            const directory = await getDirectory()
            setDirectory(directory)
        }
        loadDirectory()
    }, [])

    if (!directory) return null

    const list = directory.list()
    const files = list.filter((file): file is File => file instanceof File)

    return (
        <Container>

            <ScrollView>
                <View className='gap-2'>
                    {
                        files.map(file => (
                            <FileCard
                                key={file.uri.toString()}
                                file={file}
                                onShare={() => { }}
                            />
                        ))
                    }
                </View>
            </ScrollView>

            <Button onPress={getFiles} >
                <Text className='text-white'>Files</Text>
            </Button>
        </Container>
    )
}

export default Files