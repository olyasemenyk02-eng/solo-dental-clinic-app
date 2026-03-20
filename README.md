# solo-dental-clinic-app

# SmileCare Dental – Cross-Platform Mobile App

A modern, cross-platform mobile application for a solo dental clinic built with **React Native** and **Expo**. The app enables patients to browse dental services, book appointments, and manage their visits — on both **iOS** and **Android** following each platform's native design guidelines.

---

## Platform UX Design

| Concern | iOS (Apple HIG) | Android (Material Design) |
|---|---|---|
| **Navigation** | Stack with swipe-back gesture, `formSheet` presentation for booking | `slide_from_right` transitions, standard back button |
| **Back button** | `< Back` text + chevron (SF-style) | Arrow icon (Material icon) |
| **Header** | Centered title, hairline separator | Left-aligned title, elevation shadow |
| **Buttons** | `TouchableOpacity` with `activeOpacity` | `TouchableNativeFeedback` with ripple |
| **Date picker** | Inline `DateTimePicker` calendar | Modal `DateTimePicker` dialog |
| **Alerts** | `ActionSheetIOS` (bottom action sheet) | `Alert` dialog (Material) |
| **FAB** | Full-width bottom pill button | Circular FAB (bottom-right) |
| **Tab bar** | iOS-style tab bar with system icons | Material bottom navigation |
| **Typography** | SF Pro system font, HIG type scale | Roboto system font, Material type scale |
| **Shadows** | `shadowColor/Opacity/Radius/Offset` | `elevation` |
| **Segmented control** | Pill-shaped filter row with white active tab | Same pill design with elevation |

---

## Features

- 📅 **Book Appointments** – 4-step wizard: service → date/time → patient details → review
- 🗓️ **My Appointments** – Filter by upcoming / completed / cancelled, pull-to-refresh
- 🦷 **Services Catalog** – Browse and search all dental services with category filters
- ✅ **Confirmation Screen** – Animated success screen with confirmation code
- 📍 **Contact & Clinic Info** – Opening hours, map link, call/email actions
- 🎨 **Design System** – Shared colour palette, typography scale, 8pt spacing grid

---

## Tech Stack

- [Expo](https://expo.dev/) SDK 51 (managed workflow)
- [React Navigation](https://reactnavigation.org/) – Bottom Tabs + Native Stack
- [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker)
- [@expo/vector-icons](https://icons.expo.fyi/) (Ionicons)
- [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- TypeScript

---

## Project Structure

```
src/
├── theme/         # Design system: colors, typography, spacing
├── components/    # Cross-platform adaptive UI components
│   ├── PlatformButton.tsx      # iOS opacity / Android ripple
│   ├── PlatformTextInput.tsx   # Adaptive input with label & error
│   ├── PlatformCard.tsx        # iOS shadow / Android elevation card
│   ├── PlatformHeader.tsx      # iOS centered / Android left-aligned title
│   ├── ServiceCard.tsx         # Compact & full service listing cards
│   ├── AppointmentCard.tsx     # Appointment list item with status
│   └── TimeSlotPicker.tsx      # Availability grid picker
├── screens/       # App screens
│   ├── HomeScreen.tsx
│   ├── BookingScreen.tsx       # 4-step booking wizard
│   ├── ConfirmationScreen.tsx  # Animated success + details
│   ├── AppointmentsScreen.tsx  # Filtered list with FAB
│   ├── AppointmentDetailScreen.tsx
│   ├── ServicesScreen.tsx      # Searchable, filterable catalog
│   └── ContactScreen.tsx       # Clinic info, map, hours
├── navigation/    # Stack + Tab navigators
│   ├── AppNavigator.tsx
│   ├── TabNavigator.tsx
│   └── types.ts
├── data/          # Mock data and in-memory store
│   ├── services.ts
│   └── appointments.ts
└── utils/
    └── platform.ts   # Platform helpers, formatters, validators
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run tests
npm test
```

---

## Design Tokens

### Colours
- **Primary**: `#2B6CB0` (Dental Blue)
- **Secondary**: `#38B2AC` (Teal)
- **Accent**: `#F6AD55` (Warm Orange)
- **Success**: `#38A169` | **Error**: `#E53E3E`

### Spacing (8pt grid)
`xs=4` · `sm=8` · `md=16` · `lg=24` · `xl=32` · `xxl=48`

### Border Radius
iOS-biased rounder corners (12–20px) vs Material slightly squarer (8–16px)
