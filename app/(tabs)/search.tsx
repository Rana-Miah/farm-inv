import { View, FlatList } from 'react-native'
import Container from '@/components/shared/container'
import { useGetGlobalSearchItems } from '@/hooks/tanstack/mutation/item/get-item'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import ScannedItemCard from '@/components/shared/scanned-item-card'
import { Text } from '@/components/ui/text'

const Search = () => {

    const [searchValue, setSearchValue] = useState('')

    const { data: res } = useGetGlobalSearchItems(searchValue)

    const data = res?.data ? res.data : []

    return (
        <Container>
            <View className="h-12 py-2">
                <Input
                    className="flex-1"
                    placeholder="Search"
                    onChangeText={(text) => {
                        setSearchValue(text)
                    }}
                    value={searchValue}
                />
            </View>

            <FlatList
                className="pb-0 flex-1"
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item, index }) => (
                    // <ScannedItemCard
                    //     key={item.barcode}
                    //     item={item}
                    //     enableActionBtn={false}
                    //     isCollapseAble
                    //     defaultCollapse={index !== 0}
                    // />
                    <View key={item.barcode} className='py-3'>
                        <Text>{item.barcode}</Text>
                        <Text>{item.item_number}</Text>
                        <Text>{item.description}</Text>
                    </View>
                )}
            />

            {/* <View>
                <Text>hello</Text>
            </View> */}
        </Container>
    )
}

export default Search