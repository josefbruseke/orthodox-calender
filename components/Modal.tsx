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
    // Helper function to ensure children have keys
    const ensureChildrenHaveKeys = (children: React.ReactNode) => {
        if (React.Children.count(children) > 0) {
            return React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { key: child.key || `child-${index}` });
                }
                return child;
            });
        }
        return children;
    };

    // Determine if we should wrap the content in a ScrollView
    const needsScrollView = typeof children === 'string';

    // Prepare content to be rendered
    const contentToRender = needsScrollView ? (
        <ScrollView>
            <Text style={styles.modalText}>{children}</Text>
        </ScrollView>
    ) : (
        ensureChildrenHaveKeys(children)
    );

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

                    {contentToRender}
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
        padding: 10,
        width: '95%',
        maxHeight: '80%',
        flex: 0, // This ensures content doesn't expand beyond maxHeight
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