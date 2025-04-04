import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';

const fastingLegend = [
  { symbol: require('@/assets/icons/strict_fast_icon.webp'), text: 'Strict Fast: Refrain from meat, fish, oil, wine, dairy, and eggs.' },
  { symbol: require('@/assets/icons/wine_oil_icon.webp'), text: 'Wine & Oil: Wine and oil are allowed. Refrain from meat, fish, dairy, and eggs.'},
  { symbol: require('@/assets/icons/fish_icon.webp'), text: 'Fish, oil and wine are allowed: Refrain from meat, dairy and eggs.'},
  { symbol: require('@/assets/icons/cheese_icon.webp'), text: 'Dairy Allowed: Dairy, eggs, fish, oil and wine are allowed. Refrain from meat.'},
  { symbol: null, text: 'No Symbol - Fast Free: All Foods Allowed.'},
];

export default function FastingLegend() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Fasting Legend</Text>
                {fastingLegend.map((item, index) => (
                    <View key={index} style={styles.section}>
                        <View style={styles.legendItem}>
                            {item.symbol && <Image source={item.symbol} style={styles.icon} />}
                            <Text style={styles.readingText}>{item.text}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

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
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  readingText: {
    color: '#333',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'left', // Changed to left for better readability of items
    flex: 1, // Allows text to take remaining space
  },
});