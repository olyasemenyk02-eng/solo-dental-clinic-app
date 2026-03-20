# BrightSmile Dental Clinic App

A modern, mobile-first dental clinic appointment booking system built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Patient Booking
- **Quick booking flow** — Book an appointment in 4 simple steps
- **Service selection** — Browse available dental services with pricing
- **Doctor selection** — Choose your preferred dentist
- **Date & time picker** — Select from available slots
- **Booking confirmation** — Instant confirmation with appointment details

### Staff Portal (Admin)
- **Dashboard** — Overview of appointments and statistics
- **Appointments management** — View all bookings with status tracking
- **Doctor management** — View doctors and their schedules

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Design:** Mobile-first, clean medical theme

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home/Landing page
│   ├── layout.tsx            # Root layout with header & footer
│   ├── globals.css           # Global styles & theme
│   ├── book/
│   │   └── page.tsx          # Multi-step booking wizard
│   ├── confirmation/
│   │   └── page.tsx          # Booking confirmation
│   └── admin/
│       ├── page.tsx          # Admin dashboard
│       ├── appointments/
│       │   └── page.tsx      # Appointments list
│       └── doctors/
│           └── page.tsx      # Doctors list
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   ├── ServiceCard.tsx       # Service selection card
│   ├── DoctorCard.tsx        # Doctor selection card
│   ├── TimeSlotPicker.tsx    # Date & time picker
│   └── BookingSteps.tsx      # Step progress indicator
└── lib/
    ├── types.ts              # TypeScript interfaces
    └── data.ts               # Mock data & utilities
```