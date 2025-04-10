import { Image, StyleSheet, View, Text, ScrollView, useWindowDimensions, FlatList } from 'react-native';

const fastingLegend = [
    { symbol: require('@/assets/icons/strict_fast_icon.webp'), text: 'Strict Fast: Refrain from meat, fish, oil, wine, dairy, and eggs.' },
    { symbol: require('@/assets/icons/wine_oil_icon.webp'), text: 'Wine & Oil: Wine and oil are allowed. Refrain from meat, fish, dairy, and eggs.' },
    { symbol: require('@/assets/icons/fish_icon.webp'), text: 'Fish, oil and wine are allowed: Refrain from meat, dairy and eggs.' },
    { symbol: require('@/assets/icons/cheese_icon.webp'), text: 'Dairy Allowed: Dairy, eggs, fish, oil and wine are allowed. Refrain from meat.' },
    { symbol: null, text: 'No Symbol - Fast Free: All Foods Allowed.' },
];

export default function FastingLegend() {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 400;
    const isMediumScreen = width >= 400 && width < 700;
    const isLargeScreen = width >= 700;

    // For large screens, we'll split the items into two columns
    const renderItem = ({ item, index }) => (
        <View
            style={[
                styles.section,
                isSmallScreen && styles.sectionSmall,
                isMediumScreen && styles.sectionMedium,
                isLargeScreen && [
                    styles.sectionLarge,
                    {
                        width: '48%',
                        marginRight: index % 2 === 0 ? '4%' : 0,
                        alignSelf: fastingLegend.length % 2 !== 0 && index === fastingLegend.length - 1 ? 'center' : 'flex-start'
                    }
                ]
            ]}
        >
            <View style={styles.legendItem}>
                {item.symbol && (
                    <Image
                        source={item.symbol}
                        style={[
                            styles.icon,
                            isSmallScreen && styles.iconSmall,
                            isMediumScreen && styles.iconMedium,
                            isLargeScreen && styles.iconLarge
                        ]}
                    />
                )}
                <Text style={[
                    styles.legendText,
                    isSmallScreen && styles.legendTextSmall,
                    isMediumScreen && styles.legendTextMedium,
                    isLargeScreen && styles.legendTextLarge
                ]}>
                    {item.text}
                </Text>
            </View>
        </View>
    );

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
                    isMediumScreen && styles.titleMedium,
                    isLargeScreen && styles.titleLarge
                ]}>
                    Fasting Legend
                </Text>

                {isLargeScreen ? (
                    <View style={styles.gridContainer}>
                        <FlatList
                            data={fastingLegend}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            scrollEnabled={false}
                            columnWrapperStyle={styles.columnWrapper}
                            contentContainerStyle={styles.gridContent}
                        />
                    </View>
                ) : (
                    fastingLegend.map((item, index) => renderItem({ item, index }))
                )}
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
        maxWidth: 800,
        alignSelf: 'center',
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
    titleMedium: {
        fontSize: 22,
        marginBottom: 20,
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
        width: '100%',
    },
    sectionSmall: {
        padding: 12,
    },
    sectionMedium: {
        padding: 16,
    },
    sectionLarge: {
        padding: 20,
        marginBottom: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 12,
        marginTop: 2,
    },
    iconSmall: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    iconMedium: {
        width: 24,
        height: 24,
        marginRight: 12,
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
    legendTextMedium: {
        fontSize: 15,
        lineHeight: 22,
    },
    legendTextLarge: {
        fontSize: 17,
        lineHeight: 24,
    },
    gridContainer: {
        width: '100%',
    },
    gridContent: {
        justifyContent: 'flex-start',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    }
}); 