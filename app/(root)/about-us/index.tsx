import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

export default function AboutUsScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.header}>About Us</Text>
                <View style={styles.card}>

                    <Text style={styles.description}>
                        This app was developed by the Saint John the Theologian Orthodox Mission,
                        a mission community located in São José, Santa Catarina, Brazil.
                        Under the jurisdiction of the Ecumical Patriarchate of Constantinople
                    </Text>
                    <Text style={styles.description}>
                        If you would like to support the spread of the Orthodox Faith in Brazil, consider making a donation.
                    </Text>

                    <TouchableOpacity
                        style={styles.donateButton}
                        onPress={() => router.push('/about-us/donation')}
                    >
                        <Text style={styles.donateButtonText}>Make a Donation</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
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
