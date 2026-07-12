import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { View, Text } from 'react-native'
import Container from '@/components/shared/container'
import { useState } from "react"
import { SettingsTab } from "@/constants/type"
import { APP_SETTINGS_TAB, SETTINGS_TABS, USER_SETTINGS_TAB } from "@/constants"
import { capitalizeFirstLetter, cn, splitWord } from "@/lib/utils"
import AppSettings from "@/components/app-settings"

const Settings = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('app-settings')
    return (
        <Container>
            <View>
                <Text className='dark:text-white text-black'>Settings</Text>
            </View>
            {/* <Tabs value={value} onValueChange={setValue} className="w-[400px]"> */}
            <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as SettingsTab)}
                className="flex-1 py-3"
            >
                <TabsContent value={APP_SETTINGS_TAB}>
                    <AppSettings />
                </TabsContent>
                <TabsContent value={USER_SETTINGS_TAB}>
                    <Text>User Settings</Text>
                </TabsContent>

                <TabsList className="w-full justify-around mt-auto">
                    {
                        SETTINGS_TABS.map((tab) => (
                            <TabsTrigger key={tab} value={tab}>
                                <Text className={cn(tab === activeTab && "font-semibold")}>
                                    {capitalizeFirstLetter(splitWord(tab, '-'))}
                                </Text>
                            </TabsTrigger>
                        ))
                    }

                </TabsList>
            </Tabs>
        </Container>
    )
}

export default Settings