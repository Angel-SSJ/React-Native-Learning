import { Stack } from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ThemeProvider} from "@/context/ThemeContext";

export default function RootLayout() {
  return (
      <ThemeProvider>
        <SafeAreaProvider>
            <Stack>
              <Stack.Screen name='index' options={{headerShow:false}} />
              <Stack.Screen name='todos/[id]' options={{headerShow:false}}  />
            </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
      );
}
