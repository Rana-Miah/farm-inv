import '@/global.css';

import { Stack, Tabs } from 'expo-router';
import { Lucide } from "@react-native-vector-icons/lucide";



export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function TabsLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  )
}