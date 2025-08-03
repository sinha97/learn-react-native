import { Stack } from "expo-router";
import "./global.css"; // Import global styles
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(tabs)/search" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/saved" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/profile" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="not-found" options={{ title: "Page Not Found" }} />
      <Stack.Screen name="404" options={{ title: "Page Not Found" }} />
      <Stack.Screen name="500" options={{ title: "Server Error" }} /> */}
      </Stack>
    </>
  );
}
