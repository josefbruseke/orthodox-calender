import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import FastingLegend from '@/components/FastingLegend';
import Modal from '@/components/Modal';
import ReadingsModal from '@/components/ReadingsModal'; // Import the new ReadingsModal
import { fastingRules } from '@/constants/FastingRules';
import { Ionicons } from '@expo/vector-icons'; // Add this import for the magnifying glass icon

const DATA_URL = process.env.EXPO_PUBLIC_DATA_URL;

interface ReadingItem {
  reference?: string;
  text?: string;
}

interface Readings {
  gospel?: ReadingItem[];
  matins_gospel?: ReadingItem[];
  epistle?: ReadingItem[];
  old_testament?: ReadingItem[];
}

interface CalendarData {
  summary?: string;
  saints_and_feasts?: string[];
  fast_type?: string;
  readings?: Readings;
}

interface CalendarViewProps {
  date: string; // format 'YYYY-MM-DD'
}

export default function CalendarView({ date }: CalendarViewProps) {
  const [data, setData] = useState<CalendarData | null>(null);
  const [selectedReading, setSelectedReading] = useState<ReadingItem | null>(null);
  const [showReadingsModal, setShowReadingsModal] = useState(false);
  const [showLegendModal, setShowLegendModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!DATA_URL) throw new Error('DATA_URL is not defined');
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        const year = date.slice(0, 4);
        const dayData = jsonData[year]?.[date];

        const mappedData: CalendarData = {
          summary: dayData?.summary,
          saints_and_feasts: dayData?.feast || [],
          fast_type: dayData?.['fast-type'],
          readings: {
            gospel: dayData?.readings?.['gospel-reading'] || [],
            matins_gospel: dayData?.readings?.['matins-gospel-reading'] || [],
            epistle: dayData?.readings?.['epistle-reading'] || [],
            old_testament: dayData?.readings?.['old-testament-reading'] || [],
          },
        };

        setData(mappedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [date]);

  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);

  const readableDate = dateObj.toLocaleDateString('en', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleReadingPress = (reading: ReadingItem) => {
    setSelectedReading(reading);
    setShowReadingsModal(true);
  };

  const fastInfo = data?.fast_type ? fastingRules[data.fast_type] : undefined;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>{readableDate}</Text>
        </View>

        <Text style={styles.title}>{data?.summary || 'Loading...'}</Text>

        {data?.fast_type && (
          <View style={styles.fastTypeContainer}>
            <Text style={styles.fastTypeText}>{data.fast_type}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Readings</Text>
          {data?.readings &&
            Object.entries(data.readings).map(([key, readingsArray]) => {
              if (!readingsArray || readingsArray.length === 0) return null;

              const formattedKey =
                key === 'old_testament'
                  ? 'Old Testament'
                  : key === 'gospel'
                    ? 'Gospel'
                    : key === 'matins_gospel'
                      ? 'Matins Gospel'
                      : key === 'epistle'
                        ? 'Epistle'
                        : key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');

              return (
                <View key={key} style={styles.readingItem}>
                  <Text style={styles.readingTitle}>{formattedKey}</Text>
                  {readingsArray.map((item: ReadingItem, index: any) => (
                    <TouchableOpacity
                      key={`${key}-${index}`}
                      onPress={() => handleReadingPress(item)}
                      style={styles.readingButton}
                    >
                      <View style={styles.readingButtonContent}>
                        <Text style={[styles.readingText, styles.readingLink]}>
                          {item.reference}
                        </Text>
                        <Ionicons
                          name="search"
                          size={20}
                          color="#CF4A46"
                          style={styles.readingIcon}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              );
            })}
        </View>

        {data?.saints_and_feasts && data.saints_and_feasts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Saints and Feasts</Text>
            {data.saints_and_feasts.map((saint, index) => (
              <Text key={index} style={styles.saintText}>
                • {saint}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Use the new ReadingsModal component */}
      {selectedReading && (
        <ReadingsModal
          visible={showReadingsModal}
          onClose={() => {
            setShowReadingsModal(false);
            // Small delay before clearing the reading data to allow animation to complete
            setTimeout(() => setSelectedReading(null), 300);
          }}
          reading={selectedReading}
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

// Updated styles with better styling for fast type display
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6',
    paddingVertical: 8,
  },
  content: {
    padding: 16,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  dateHeader: {
    backgroundColor: '#CF4A46',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
  },
  dateText: {
    color: '#FBF9F8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#CF4A46',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 28,
  },
  section: {
    backgroundColor: '#FBF9F8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  sectionHeader: {
    color: '#CF4A46',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8c874',
    paddingBottom: 8,
    textAlign: 'center',
  },
  readingItem: {
    marginBottom: 16,
  },
  readingTitle: {
    color: '#CF4A46',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  readingButton: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginVertical: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  readingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  readingText: {
    color: '#333',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  readingLink: {
    color: '#CF4A46',
    fontWeight: '500',
  },
  readingIcon: {
    position: 'absolute',
    right: 16,
  },
  saintText: {
    color: '#333',
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  fastTypeContainer: {
    backgroundColor: '#f8e9c6',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e8c874',
    minWidth: '60%',
    marginBottom: 16,
  },
  fastTypeText: {
    color: '#864c24',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  fastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
  },
  fastIcon: {
    width: 28,
    height: 28,
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
  },
  legendModalContent: {
    flex: 1,
    height: '80%',
    paddingBottom: 0,
  },
});