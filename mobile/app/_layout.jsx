import { Slot, Stack } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
  <ClerkProvider tokenCache={tokenCache} >
  <SafeScreen>
        {/* <Stack screenOptions={{headerShown: false}} /> */}
        <Slot />
  </SafeScreen>
  <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
  </ClerkProvider>
  ); // to remove header write screenOptions={{headerShown: false}} inside <Stack  />
}
