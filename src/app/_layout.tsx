import "@/styles/global.css"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
    return (
        <>
         <StatusBar style="light" backgroundColor="transparent" translucent />
            <Slot />
        </>
    )
}