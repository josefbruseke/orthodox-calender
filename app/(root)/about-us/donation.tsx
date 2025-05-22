import { router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Clipboard, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Donation() {
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const copyPixKey = () => {
        const pixKey = "05.369.204.0001/18";
        Clipboard.setString(pixKey);
        setShowCopiedMessage(true);

        // Hide the message after 3 seconds
        setTimeout(() => {
            setShowCopiedMessage(false);
        }, 3000);
    };

    return (
        <View style={styles.container}>
            {/* Improved Back button */}
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Ionicons name="arrow-back" size={22} color="#333" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.title}>Support Options</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={copyPixKey}
                        >
                            <View style={styles.buttonInner}>
                                <Text style={styles.buttonText}>Copy PIX Key (BRL)</Text>
                                <Text style={styles.flagEmoji}>🇧🇷</Text>
                            </View>
                        </TouchableOpacity>

                        {showCopiedMessage && (
                            <View style={styles.notification}>
                                <Text style={styles.notificationText}>
                                    ✅ Chave PIX copiada: 05.369.204.0001/18
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity style={styles.button}>
                            <View style={styles.buttonInner}>
                                <Text style={styles.buttonText}>Credit Card (BRL)</Text>
                                <Text style={styles.flagEmoji}>🇧🇷</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push('https://donate.stripe.com/test_eVabKyeBO9Py2c0eUU')}
                        >
                            <View style={styles.buttonInner}>
                                <Text style={styles.buttonText}>Credit Card (USD)</Text>
                                <Text style={styles.flagEmoji}>🇺🇸</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 10,
        marginLeft: 10,
        alignSelf: 'flex-start',
    },
    backButtonText: {
        marginLeft: 4,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonContainer: {
        gap: 16,
        maxWidth: 400,
        width: '100%',
        alignSelf: 'center',
    },
    button: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    buttonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'left',
        color: '#333',
        fontWeight: '500',
    },
    flagEmoji: {
        fontSize: 20,
    },
    notification: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginTop: -8,
        marginBottom: 8,
    },
    notificationText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    }
});