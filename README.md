# Gas Tracker

An offline-first mobile application built with Expo and React Native to track work trips, fuel expenses, driver balances, and payments.

The application is designed for teams or individuals who need to calculate fuel reimbursement accurately while keeping all data locally on the device.

## Features

### Trips

- Create and manage trips
- Automatic fuel consumption calculation
- Automatic trip cost calculation
- Automatic amount owed per passenger
- Trip history
- Advanced filtering
- Driver and vehicle summaries

### Drivers

- Driver management
- Preferred vehicle
- Trip summary
- Driver trip history

### Vehicles

- Vehicle management
- Fuel efficiency configuration
- Vehicle trip history

### Payments

- Register driver payments
- Payment history

### Reports

- Global dashboard
- Driver reports
- Vehicle reports
- Date filtering
- Driver filtering

### Preferences

- Theme (Light / Dark / System)
- Currency
- Distance unit
- Default gas price
- Default passenger count
- Default trip date
- Preferred vehicle preload
- Last trip preload

### Data Management

- Export data as JSON
- Import data
- Local backups
- Backup restore
- Database maintenance
- Application reset

---

## Tech Stack

- Expo SDK 54
- React Native
- Expo Router
- TypeScript
- Drizzle ORM
- Expo SQLite
- TanStack Query
- React Hook Form
- Zod
- Lucide Icons

---

## Screens

- Dashboard
- Trips
- Trip History
- Trip Details
- Drivers
- Driver Details
- Vehicles
- Vehicle Details
- Payments
- Reports
- Settings

---

## Calculations

Fuel consumed:

```
(distance × fuel efficiency) / 100
```

Trip cost:

```
fuel consumed × fuel price
```

Amount owed:

```
trip cost / passengers
```

---

## Running locally

```bash
npm install
```

```bash
npx expo start
```

Android

```bash
npx expo run:android
```

iOS

```bash
npx expo run:ios
```

---

## Roadmap

- Charts
- PDF reports
- CSV export
- Cloud synchronization
- Multi-device support
- Notifications

---

## License

MIT
