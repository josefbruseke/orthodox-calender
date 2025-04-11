import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal as RNModal } from 'react-native';
import React from 'react';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    contentStyle?: object;
}

const Modal: React.FC<ModalProps> = ({
    visible,
    onClose,
    title,
    children,
    contentStyle,
}) => {
    return (
        <RNModal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, contentStyle]}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                    {title && <Text style={styles.modalTitle}>{title}</Text>}
                    {typeof children === 'string' ? (
                        <ScrollView>
                            <Text style={styles.modalText}>{children}</Text>
                        </ScrollView>
                    ) : (
                        children
                    )}
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FBF9F8',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        color: '#CF4A46',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
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

export default Modal;