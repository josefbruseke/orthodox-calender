import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { getCurrentFormattedDate } from '@/utils/date';
import { useRouter } from 'expo-router';
import FastingLegend from '@/components/FastingLegend';
import Modal from '@/components/Modal';


interface DayData {
  date: string;
  summary?: string;
  fast_type?: string;
  isCurrentDay: boolean;
}

interface DayEntry {
  summary?: string;
  feast?: string[];
  'fast-type'?: string;
  readings?: any;
}

interface YearData {
  [year: string]: {
    [date: string]: DayEntry;
  };
}

const fastingIcons: { [key: string]: any } = {
  'Strict Fast': require('@/assets/icons/cross_icon.png'),
  'Fast Day (Wine and Oil Allowed)': require('@/assets/icons/grape_icon.png'),
  'Fast Day (Fish Allowed)': require('@/assets/icons/fish_icon.png'),
  'Fast Day (Dairy, Eggs, and Fish Allowed)': require('@/assets/icons/cheese_icon.png'),
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState<{ [date: string]: DayEntry }>({});
  const [loading, setLoading] = useState(true);
  const [showLegendModal, setShowLegendModal] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayFormatted = getCurrentFormattedDate();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.EXPO_PUBLIC_DATA_URL!);
        if (!response.ok) throw new Error('Failed to fetch data');

        const jsonData: YearData = await response.json();
        const yearData = jsonData[year.toString()];

        if (!yearData) {
          setMonthData({});
          return;
        }

        const currentMonth = (month + 1).toString().padStart(2, '0');
        const filteredMonthData: { [date: string]: DayEntry } = {};

        Object.keys(yearData).forEach(date => {
          if (date.startsWith(`${year}-${currentMonth}`)) {
            filteredMonthData[date] = yearData[date];
          }
        });

        setMonthData(filteredMonthData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, month]);

  const getDaysInMonth = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: (DayData | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      const dayData = monthData?.[dateString] || {};

      days.push({
        date: dateString,
        summary: dayData.summary || '',
        fast_type: dayData['fast-type'] || '',
        isCurrentDay: dateString === todayFormatted,
      });
    }

    return days;
  };

  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(year, month + increment, 1));
    setLoading(true);
  };

  const monthName = currentDate.toLocaleDateString('en', { month: 'long', year: 'numeric' });
  const days = getDaysInMonth();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getFastIcon = (fastType?: string) => {
    if (!fastType) return null;
    const matchedKey = Object.keys(fastingIcons).find(
      key => key.toLowerCase() === fastType.toLowerCase()
    );
    return matchedKey ? fastingIcons[matchedKey] : null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthHeader}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <MaterialIcons name="chevron-left" size={30} color="#CF4A46" />
        </TouchableOpacity>

        <Text style={styles.monthText}>{monthName}</Text>

        <TouchableOpacity onPress={() => changeMonth(1)}>
          <MaterialIcons name="chevron-right" size={30} color="#CF4A46" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.legendButton}
        onPress={() => setShowLegendModal(true)}
      >
        <Text style={styles.legendButtonText}>Fasting Legend</Text>
      </TouchableOpacity>

      <View style={styles.dayNames}>
        {dayNames.map(day => (
          <Text key={day} style={styles.dayNameText}>{day}</Text>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={days}
          numColumns={7}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item: day }) => (
            <TouchableOpacity
              style={[
                styles.dayCell,
                !day && styles.emptyDay,
                day?.isCurrentDay && styles.currentDay,
              ]}
              onPress={() => {
                if (day) {
                  router.push({ pathname: '/calendar/day', params: { date: day.date } });
                }
              }}
              disabled={!day}
            >
              {day && (
                <View style={styles.dayCellContent}>
                  <Text style={styles.dayNumber}>{day.date.split('-')[2]}</Text>
                  {day.fast_type && (
                    <View style={styles.fastIconContainer}>
                      <Image
                        source={getFastIcon(day.fast_type)}
                        style={styles.fastIcon}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      )}

      {/* Fasting Legend Modal */}
      <Modal
        visible={showLegendModal}
        onClose={() => setShowLegendModal(false)}
        contentStyle={styles.legendModalContent}
      >
        <FastingLegend />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    padding: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CF4A46',
    textAlign: 'center',
  },
  legendButton: {
    backgroundColor: '#CF4A46',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  legendButtonText: {
    color: '#FBF9F8',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  dayNames: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayNameText: {
    width: '14%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 2, // Reduced padding to give more space
    borderWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#FBF9F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCellContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute space between number and icon
    paddingVertical: 2,
  },
  emptyDay: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  currentDay: {
    backgroundColor: '#F0E6E6',
    borderColor: '#CF4A46',
  },
  dayNumber: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 12, // Slightly reduced font size
    textAlign: 'center',
  },
  fastIconContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Take up available space
  },
  fastIcon: {
    width: 20, // Slightly reduced icon size
    height: 20, // Slightly reduced icon size
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredModalContent: {
    backgroundColor: '#FBF9F8',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#CF4A46',
    textAlign: 'center',
  },
  legendModalContent: {
    flex: 1,
    height: '80%',
    paddingBottom: 0,
  },
});