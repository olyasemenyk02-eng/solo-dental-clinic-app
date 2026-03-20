import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { lightColors, spacing, textStyles } from '../theme';
import { TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ContactScreen from '../screens/ContactScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICON: Record<keyof TabParamList, { active: string; inactive: string }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Appointments: { active: 'calendar', inactive: 'calendar-outline' },
  Services: { active: 'medical', inactive: 'medical-outline' },
  Contact: { active: 'information-circle', inactive: 'information-circle-outline' },
};

/**
 * Bottom Tab Navigator
 *
 * iOS   → Standard bottom tab bar (HIG) with center-placed icons + labels.
 * Android → Material You bottom navigation bar with ripple & tonal indicator.
 */
const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICON[route.name as keyof TabParamList];
          const iconName = (focused ? icons.active : icons.inactive) as any;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: lightColors.tabBarActive,
        tabBarInactiveTintColor: lightColors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: lightColors.tabBar,
          borderTopWidth: Platform.select({ ios: StyleSheet.hairlineWidth, android: 0, default: StyleSheet.hairlineWidth }),
          borderTopColor: lightColors.border,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: -2 },
            },
            android: {
              elevation: 8,
            },
            default: {},
          }),
        },
        tabBarLabelStyle: {
          ...textStyles.labelSmall,
          fontSize: Platform.select({ ios: 10, android: 12, default: 10 }),
          fontWeight: '500',
          marginBottom: Platform.select({ ios: 0, android: 2, default: 0 }),
        },
        tabBarItemStyle: Platform.select({
          android: {
            borderRadius: 16,
            marginHorizontal: 4,
          },
          ios: {},
          default: {},
        }),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ tabBarLabel: 'Appointments' }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{ tabBarLabel: 'Services' }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{ tabBarLabel: 'Contact' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
