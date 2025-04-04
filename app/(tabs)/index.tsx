import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

const DATA_URL =
  'https://marjwkpvsvsqdzjjnrrt.supabase.co/storage/v1/object/sign/orthodox-calendar-2025/orthodox_calendar_2025.json?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvcnRob2RveC1jYWxlbmRhci0yMDI1L29ydGhvZG94X2NhbGVuZGFyXzIwMjUuanNvbiIsImlhdCI6MTc0MzY0NjE0NCwiZXhwIjoxNzc1MTgyMTQ0fQ.IrfgGMqFbHjuJe2nWDkcWJwbbMB9o-PF8EmN-Xmu37A';

interface ReadingItem {
  source?: string;
  text?: string;
}

interface Readings {
  gospel?: ReadingItem;
  matins_gospel?: ReadingItem;
  epistle?: ReadingItem;
  old_testament?: ReadingItem[];
}

interface CalendarData {
  summary?: string;
  saints_and_feasts?: string[];
  readings?: Readings;
}

export default function HomeScreen() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    setCurrentDate(formattedDate);

    const fetchData = async () => {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('Failed to fetch data');

        const jsonData = await response.json();
        const year = formattedDate.slice(0, 4);
        const dayData = jsonData[year]?.[formattedDate];

        setData(dayData || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Date Header */}
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </Text>
        </View>

        {/* Main Title */}
        <Text style={styles.title}>{data?.summary || 'Carregando...'}</Text>

        {/* Readings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Leituras do Dia</Text>
          {data?.readings &&
            Object.entries(data.readings).map(([key, value]) => {
              if (!value) return null;

              const formattedKey =
                key === 'old_testament'
                  ? 'Antigo Testamento'
                  : key === 'gospel'
                  ? 'Evangelho'
                  : key === 'epistle'
                  ? 'Epístola'
                  : key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');

              return (
                <View key={key} style={styles.readingItem}>
                  <Text style={styles.readingTitle}>{formattedKey}</Text>
                  {Array.isArray(value) ? (
                    value.map((item, index) => (
                      <Text key={`${key}-${index}`} style={styles.readingText}>
                        {item.source}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.readingText}>{value.source}</Text>
                  )}
                </View>
              );
            })}
        </View>

        {/* Saints and Feasts Section */}
        {data?.saints_and_feasts && data.saints_and_feasts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Santos e Festas</Text>
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

// Cores baseadas na imagem: azul escuro, dourado e branco
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F6', // Fundo branco suave
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  content: {
    padding: 16,
    width: '100%', // Garante que o conteúdo ocupe toda a largura
  },
  dateHeader: {
    backgroundColor: '#CF4A46', // Vermelho
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateText: {
    color: '#FBF9F8',  // Bege/Off-White
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#CF4A46', // Vermelho
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FBF9F8', // Bege/Off-White
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '90%', // Ajusta a largura para centralizar
    alignSelf: 'center', // Garante que o componente esteja centralizado
  },
  sectionHeader: {
    color: '#CF4A46', // Vermelho
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8c874', // Dourado
    paddingBottom: 4,
    textAlign: 'center', // Centraliza o texto
  },
  readingItem: {
    marginBottom: 12,
  },
  readingTitle: {
    color: '#CF4A46', // Vermelho
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center', // Centraliza o texto
  },
  readingText: {
    color: '#333',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center', // Centraliza o texto
  },
  saintText: {
    color: '#333',
    fontSize: 15,
    marginBottom: 6,
    lineHeight: 22,
    textAlign: 'center', // Centraliza o texto
  },
});