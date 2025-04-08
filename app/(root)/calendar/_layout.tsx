import { Stack } from "expo-router";

export default function CalendarLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="day" />  // Matches app/calendar/day.tsx
    </Stack>
  );
}