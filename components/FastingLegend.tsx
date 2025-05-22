import { Image, StyleSheet, View, Text, useWindowDimensions, ScrollView } from 'react-native';
import { useState } from 'react';

const fastingLegend = [
    { symbol: require('@/assets/icons/cross_icon.png'), text: 'Strict Fast: Refrain from meat, fish, oil, wine, dairy, and eggs.' },
    { symbol: require('@/assets/icons/grape_icon.png'), text: 'Wine & Oil: Wine and oil are allowed. Refrain from meat, fish, dairy, and eggs.' },
    { symbol: require('@/assets/icons/fish_icon.png'), text: 'Fish, oil and wine are allowed: Refrain from meat, dairy and eggs.' },
    { symbol: require('@/assets/icons/cheese_icon.png'), text: 'Dairy Allowed: Dairy, eggs, fish, oil and wine are allowed. Refrain from meat.' },
    { symbol: null, text: 'No Symbol - Fast Free: All Foods Allowed.' },
];

interface FastingLegendItem {
    symbol: any | null;
    text: string;
}

export default function FastingLegend() {
    const { width } = useWindowDimensions();
    const [containerWidth, setContainerWidth] = useState(0);

    // We'll determine screen size based on the container width
    // This helps when inside the modal where actual space is limited
    const effectiveWidth = containerWidth > 0 ? containerWidth : width;

    // Screen size breakpoints
    const isSmallScreen = effectiveWidth < 400;
    const isMediumScreen = effectiveWidth >= 400 && effectiveWidth < 700;
    const isLargeScreen = effectiveWidth >= 700;

    // Determine if we should use grid layout
    const useGridLayout = isLargeScreen;

    // Function to measure the container width
    const onContainerLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };

    return (
        <View
            style={styles.container}
            onLayout={onContainerLayout}
        >
            <Text style={[
                styles.title,
                isSmallScreen && styles.titleSmall,
                isMediumScreen && styles.titleMedium,
                isLargeScreen && styles.titleLarge
            ]}>
                Fasting Legend
            </Text>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {useGridLayout ? (
                    // Grid layout for large screens
                    <View style={styles.gridContent}>
                        {fastingLegend.map((item, index) => (
                            <View
                                key={`legend-item-${index}`}
                                style={[
                                    styles.section,
                                    styles.sectionLarge,
                                    {
                                        width: '48%',
                                        marginRight: index % 2 === 0 ? '4%' : 0,
                                    }
                                ]}
                            >
                                <View style={styles.legendItem}>
                                    {item.symbol && (
                                        <Image
                                            source={item.symbol}
                                            style={styles.iconLarge}
                                        />
                                    )}
                                    <Text style={styles.legendTextLarge}>
                                        {item.text}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    // Stack layout for small/medium screens
                    fastingLegend.map((item, index) => (
                        <View
                            key={`legend-item-${index}`}
                            style={[
                                styles.section,
                                isSmallScreen && styles.sectionSmall,
                                isMediumScreen && styles.sectionMedium,
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
                                        ]}
                                    />
                                )}
                                <Text style={[
                                    styles.legendText,
                                    isSmallScreen && styles.legendTextSmall,
                                    isMediumScreen && styles.legendTextMedium,
                                ]}>
                                    {item.text}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FBF9F8',
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    title: {
        color: '#CF4A46',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
        marginTop: 2,
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
    gridContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});