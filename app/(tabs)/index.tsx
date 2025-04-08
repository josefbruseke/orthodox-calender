import CalendarView from '@/components/CalendarView';
import { getCurrentFormattedDate } from '@/utils/date';

export default function HomeScreen() {
  const today = getCurrentFormattedDate();

  return <CalendarView date={today} />;
}
