import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal as RNModal, Platform, Dimensions, Animated, SafeAreaView } from 'react-native';
import React, { useRef, useEffect } from 'react';

interface ReadingsModalProps {
    visible: boolean;
    onClose: () => void;
    reading: {
        reference?: string;
        text?: string;
    } | null;
}

const ReadingsModal: React.FC<ReadingsModalProps> = ({ visible, onClose, reading }) => {
    const { width, height } = Dimensions.get('window');
    const isWeb = Platform.OS === 'web';

    // Animation value for slide-up effect
    const slideAnim = useRef(new Animated.Value(height)).current;

    // Reset animation when visibility changes
    useEffect(() => {
        if (visible) {
            // Start from bottom and slide up
            slideAnim.setValue(height);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            // Slide back down when closing
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    // For web, we use a different approach
    if (isWeb) {
        const modalWidth = Math.min(800, width * 0.9);

        return (
            <RNModal
                visible={visible}
                transparent={true}
                animationType="fade"
                onRequestClose={onClose}
            >
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.webModalContent,
                            {
                                width: modalWidth,
                                maxHeight: height * 0.85,
                                alignSelf: 'center',
                                marginTop: height * 0.05,
                                marginBottom: height * 0.05,
                            }
                        ]}
                    >
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>{reading?.reference || 'Reading'}</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="Close reading">
                                <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            style={styles.scrollContainer}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {reading?.text ? (
                                <Text style={styles.readingText}>{reading.text}</Text>
                            ) : (
                                <Text style={styles.noContentText}>No reading content available</Text>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </RNModal>
        );
    }

    // Mobile version with slide-up animation
    return (
        <RNModal
            visible={visible}
            transparent={true}
            animationType="none" // We handle animation ourselves
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <SafeAreaView style={styles.modalOverlay}>
                <Animated.View
                    style={[
                        styles.mobileModalContent,
                        {
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    {/* Close button - circular positioned at top-right */}
                    <TouchableOpacity
                        style={styles.mobileCloseButton}
                        onPress={onClose}
                        accessibilityLabel="Close reading"
                    >
                        <Text style={styles.mobileCloseButtonText}>×</Text>
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={styles.mobileHeader}>
                        <Text style={styles.mobileHeaderTitle}>{reading?.reference || 'Reading'}</Text>
                    </View>

                    {/* Content */}
                    <ScrollView
                        style={styles.mobileScrollContainer}
                        contentContainerStyle={styles.mobileScrollContent}
                    >
                        {reading?.text ? (
                            <Text style={styles.mobileReadingText}>{reading.text}</Text>
                        ) : (
                            <Text style={styles.noContentText}>No reading content available</Text>
                        )}
                    </ScrollView>
                </Animated.View>
            </SafeAreaView>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    // Common styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.65)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noContentText: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        paddingTop: 20,
    },

    // Web specific styles
    webModalContent: {
        backgroundColor: '#FBF9F8',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CF4A46',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        position: 'relative',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        paddingHorizontal: 40,
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        top: 14,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 28,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 30,
    },
    readingText: {
        color: '#333',
        fontSize: 18,
        lineHeight: 28,
        fontFamily: 'Georgia, serif',
    },

    // Mobile specific styles
    mobileModalContent: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#FBF9F8',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        overflow: 'hidden',
        flex: 1,
    },
    mobileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CF4A46',
        paddingVertical: 20,
        paddingHorizontal: 16,
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    mobileHeaderTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mobileCloseButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 10,
        backgroundColor: '#CF4A46',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    mobileCloseButtonText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 26,
    },
    mobileScrollContainer: {
        flex: 1,
    },
    mobileScrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    mobileReadingText: {
        color: '#333',
        fontSize: 19,
        lineHeight: 30,
        fontFamily: Platform.select({
            ios: 'Georgia',
            android: 'serif',
            default: 'serif',
        }),
    },
});

export default ReadingsModal;