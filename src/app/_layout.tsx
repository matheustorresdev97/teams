import "@/styles/global.css"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { ActivityIndicator } from 'react-native'

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
    })

    if (!fontsLoaded) {
        return <ActivityIndicator />
    }

    return (
        <>
            <StatusBar style="light" backgroundColor="transparent" translucent />
            <Slot />
        </>
    )
}