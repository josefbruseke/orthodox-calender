import { Image, StyleSheet, View, Text, ScrollView, useWindowDimensions } from 'react-native';

const fastingLegend = [
  { symbol: require('@/assets/icons/strict_fast_icon.webp'), text: 'Strict Fast: Refrain from meat, fish, oil, wine, dairy, and eggs.' },
  { symbol: require('@/assets/icons/wine_oil_icon.webp'), text: 'Wine & Oil: Wine and oil are allowed. Refrain from meat, fish, dairy, and eggs.'},
  { symbol: require('@/assets/icons/fish_icon.webp'), text: 'Fish, oil and wine are allowed: Refrain from meat, dairy and eggs.'},
  { symbol: require('@/assets/icons/cheese_icon.webp'), text: 'Dairy Allowed: Dairy, eggs, fish, oil and wine are allowed. Refrain from meat.'},
  { symbol: null, text: 'No Symbol - Fast Free: All Foods Allowed.'},
];

export default function FastingLegend() {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 400;
    const isLargeScreen = width > 700;

    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={[
                    styles.content,
                    { paddingHorizontal: isSmallScreen ? 8 : 16 }
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[
                    styles.title,
                    isSmallScreen && styles.titleSmall,
                    isLargeScreen && styles.titleLarge
                ]}>
                    Fasting Legend
                </Text>
                
                {fastingLegend.map((item, index) => (
                    <View 
                        key={index} 
                        style={[
                            styles.section,
                            isSmallScreen && styles.sectionSmall,
                            isLargeScreen && styles.sectionLarge,
                            { width: isLargeScreen ? '80%' : '100%' }
                        ]}
                    >
                        <View style={styles.legendItem}>
                            {item.symbol && (
                                <Image 
                                    source={item.symbol} 
                                    style={[
                                        styles.icon,
                                        isSmallScreen && styles.iconSmall,
                                        isLargeScreen && styles.iconLarge
                                    ]} 
                                />
                            )}
                            <Text style={[
                                styles.legendText,
                                isSmallScreen && styles.legendTextSmall,
                                isLargeScreen && styles.legendTextLarge
                            ]}>
                                {item.text}
                            </Text>
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
        backgroundColor: '#FBF8F6',
    },
    content: {
        paddingVertical: 16,
        maxWidth: 800, // Maximum width for very large screens
        alignSelf: 'center', // Center content on large screens
        width: '100%',
    },
    title: {
        color: '#CF4A46',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    titleSmall: {
        fontSize: 20,
        marginBottom: 16,
    },
    titleLarge: {
        fontSize: 26,
        marginBottom: 24,
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
        alignSelf: 'center',
    },
    sectionSmall: {
        padding: 12,
    },
    sectionLarge: {
        padding: 20,
        marginBottom: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items to top for multi-line text
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 12,
        marginTop: 2, // Better alignment with text
    },
    iconSmall: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    iconLarge: {
        width: 28,
        height: 28,
        marginRight: 16,
    },
    legendText: {
        color: '#333',
        fontSize: 15,
        lineHeight: 22,
        flex: 1,
        flexWrap: 'wrap',
    },
    legendTextSmall: {
        fontSize: 14,
        lineHeight: 20,
    },
    legendTextLarge: {
        fontSize: 17,
        lineHeight: 24,
    },
});