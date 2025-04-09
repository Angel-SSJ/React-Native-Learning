import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import{Appearance} from 'react-native'
import  {Colors} from '@/.././constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme ==='dark'?Colors.dark: Colors.light;
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Stack screenOptions={{headerStyle: {backgroundColor:theme.d}}}>
        {/*<Stack.Screen name="index" options={{title: 'Home', headerShown: false}}/>
          <Stack.Screen name ="contact" options={{title:'Contact us'}}/>*/}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/*<Stack.Screen name="(coffee)" options={{ headerShown: false }} />*/}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
  );
}
