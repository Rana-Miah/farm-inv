import { ScrollView, useWindowDimensions, View } from "react-native";
import { DetailsRow } from "./details-row";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getItemByBarcode } from "@/dal/item/get-item";
import { Text } from "../ui/text";
import { Badge } from "../ui/badge";

type Item = NonNullable<NonNullable<
    Awaited<ReturnType<typeof getItemByBarcode>>["data"]
>['item']>

type ScannedItemCardProps = {
    item: Item;
    title: string;
    description: string;
};

export const ItemDetails = ({
    title,
    description,
    item,
}: ScannedItemCardProps) => {

    const { height } = useWindowDimensions();

    return (

        <ScrollView
            style={{ maxHeight: height * 0.4 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Card className="mt-1 p-3 gap-4"                >
                <CardHeader className="flex-row justify-between items-center px-0"                    >
                    <View>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>
                            {description}
                        </CardDescription>
                    </View>
                    <ItemPriceUnit price={item.sales_price} uom={item.uom} />
                </CardHeader>

                <CardContent className="flex-col gap-2 px-0 py-0">
                    <DetailsRow
                        library="Lucide"
                        iconName="barcode"
                        label="Barcode"
                        value={item.barcode}
                    />
                    <DetailsRow
                        library="Lucide"
                        iconName="hash"
                        label="Item Code"
                        value={item.item_number}
                    />
                    <DetailsRow
                        library="Lucide"
                        iconName="file-text"
                        label="description"
                        value={item.description}
                    />
                </CardContent>
            </Card>
        </ScrollView>
    );
};


type ItemPriceUnitProps = {
    price: number;
    uom: string;
} & React.ComponentProps<typeof Text>;

const ItemPriceUnit = ({ price, uom, ...props }: ItemPriceUnitProps) => {
    return (
        <Badge
            variant="outline"
        // className="border-muted-foreground rounded-full px-4"
        >
            <Text {...props} className="text-center text-sm font-bold">
                SAR {price} / {uom ?? "".toUpperCase()}
            </Text>
        </Badge>
    );
};