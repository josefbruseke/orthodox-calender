import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'; 
import { useState, useEffect } from 'react';

const DATA_URL = process.env.EXPO_PUBLIC_DATA_URL;

const fastingLegend = [
  { symbol: require('@/assets/icons/strict_fast_icon.webp'), text: 'Strict Fast: Refrain from meat, fish, oil, wine, dairy, and eggs.' },
  { symbol: require('@/assets/icons/wine_oil_icon.webp'), text: 'Wine & Oil: Wine and oil are allowed. Refrain from meat, fish, dairy, and eggs.' },
  { symbol: require('@/assets/icons/fish_icon.webp'), text: 'Fish, oil and wine are allowed: Refrain from meat, dairy and eggs.' },
  { symbol: require('@/assets/icons/cheese_icon.webp'), text: 'Dairy Allowed: Dairy, eggs, fish, oil and wine are allowed. Refrain from meat.' },
  { symbol: null, text: 'No Symbol - Fast Free: All Foods Allowed.' },
];

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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>{readableDate}</Text>
        </View>

        <Text style={styles.title}>{data?.summary || 'Loading...'}</Text>

        {data?.fast_type && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>{data.fast_type}</Text>
            {(() => {
              const match = fastingLegend.find((entry) =>
                data.fast_type?.toLowerCase().includes(entry.text.split(':')[0].toLowerCase())
              );

              return (
                <View style={[styles.fastContainer, { justifyContent: 'center' }]}>
                  <Text style={[styles.readingText, { textAlign: 'center' }]}>
                    {match?.text || data.fast_type}
                  </Text>
                </View>
              );
            })()}
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
                  {readingsArray.map((item, index) => (
                    <Text key={`${key}-${index}`} style={styles.readingText}>
                      {item.reference}
                    </Text>
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
    </View>
  );
}

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
  readingText: {
    color: '#333',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  saintText: {
    color: '#333',
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 8,
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
});
