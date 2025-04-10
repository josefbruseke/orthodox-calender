import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

interface ReadingsProps {
    reading: {
        reference?: string;
        text?: string;
    };
    onClose: () => void;
}

export default function Readings({ reading, onClose }: ReadingsProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>

                <Text style={styles.title}>{reading.reference}</Text>
                <ScrollView>
                    <Text style={styles.text}>{reading.text}</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        backgroundColor: '#FBF9F8',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    title: {
        color: '#CF4A46',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    text: {
        color: '#333',
        fontSize: 16,
        lineHeight: 24,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#CF4A46',
    },
});