import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';
import { lightColors } from './src/theme';

// Keep the native splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Hide splash screen once the app is ready
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={lightColors.primaryDark}
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
