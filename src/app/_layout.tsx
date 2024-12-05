import "@/styles/global.css"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Loading } from "@/components/loading"

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
    })

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <>
            <StatusBar style="light" backgroundColor="transparent" translucent />
            <Slot />
        </>
    )
}