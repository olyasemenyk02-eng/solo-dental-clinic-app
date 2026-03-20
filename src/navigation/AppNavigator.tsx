import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import TabNavigator from './TabNavigator';
import BookingScreen from '../screens/BookingScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import AppointmentDetailScreen from '../screens/AppointmentDetailScreen';
import { lightColors } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root stack navigator wrapping the tab bar with modal-style screens.
 *
 * iOS   → Uses card presentation with swipe-to-go-back gesture
 * Android → Uses default slide-up animation for modals
 */
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: lightColors.background },
          animation: Platform.select({
            ios: 'default',
            android: 'slide_from_right',
            default: 'default',
          }),
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            presentation: Platform.select({
              ios: 'formSheet',
              android: 'card',
              default: 'card',
            }) as any,
            animation: Platform.select({
              ios: 'slide_from_bottom',
              android: 'slide_from_right',
              default: 'default',
            }),
          }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{
            gestureEnabled: false,
            animation: Platform.select({
              ios: 'fade',
              android: 'fade_from_bottom',
              default: 'fade',
            }),
          }}
        />
        <Stack.Screen
          name="AppointmentDetail"
          component={AppointmentDetailScreen}
          options={{
            animation: Platform.select({
              ios: 'default',
              android: 'slide_from_right',
              default: 'default',
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
