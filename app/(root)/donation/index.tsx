import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function DonationScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Support Us</Text>
            <View style={styles.card}>
                <Text style={styles.title}>Support the Orthodox Calendar</Text>

                <Text style={styles.description}>
                    The Orthodox Calendar app helps faithful around the world follow the liturgical cycle,
                    daily readings, feast days, and fasting periods according to the ancient traditions
                    of the Orthodox Church.
                </Text>

                <Text style={styles.description}>
                    Your donation helps us maintain this service, add new features, and ensure
                    the app remains available to all Orthodox Christians seeking to deepen their faith journey.
                </Text>

                <TouchableOpacity
                    style={styles.donateButton}
                    onPress={() => router.push('https://donate.stripe.com/test_eVabKyeBO9Py2c0eUU')}
                >
                    <Text style={styles.donateButtonText}>Make a Donation</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
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
    donateButton: {
        backgroundColor: '#4C6B22', // Using a color that might match Orthodox themes
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    donateButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});
