import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { useStripe } from '@stripe/stripe-react-native';

export default function CheckoutScreen() {
  const { amount } = useLocalSearchParams<{ amount: string }>();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const router = useRouter();

  // Get theme colors
  const backgroundColor = useThemeColor({ light: '#f2f2f2', dark: '#111' }, 'background');
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const primaryColor = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');

  // Fetch payment intent from your server
  const fetchPaymentIntent = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:4242/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(amount),
          currency: 'usd',
        }),
      });

      const { clientSecret, paymentIntentId } = await response.json();
      
      setClientSecret(clientSecret);
      setPaymentIntentId(paymentIntentId);
      return { clientSecret, paymentIntentId };
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      Alert.alert('Error', 'Unable to process payment. Please try again.');
      return { clientSecret: null, paymentIntentId: null };
    } finally {
      setLoading(false);
    }
  };

  // Initialize the payment sheet
  const initializePaymentSheet = async () => {
    try {
      const { clientSecret, paymentIntentId } = await fetchPaymentIntent();
      
      if (!clientSecret) return;
      
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Orthodox Calendar',
        defaultBillingDetails: {
          name: '',
        },
      });

      if (error) {
        console.error('Error initializing payment sheet:', error);
        Alert.alert('Error', error.message);
      }
    } catch (error) {
      console.error('Error initializing payment sheet:', error);
    }
  };

  // Open the payment sheet
  const openPaymentSheet = async () => {
    if (!clientSecret) return;

    setLoading(true);
    
    const { error } = await presentPaymentSheet();
    
    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
      Alert.alert('Payment failed', error.message);
    } else {
      checkPaymentStatus();
    }
    
    setLoading(false);
  };

  // Check payment status
  const checkPaymentStatus = async () => {
    if (!paymentIntentId) return;

    try {
      const response = await fetch(`http://localhost:4242/payment-intent/${paymentIntentId}`);
      const { status } = await response.json();

      if (status === 'succeeded') {
        Alert.alert(
          'Thank You!', 
          'Your donation was successfully processed. We appreciate your support!',
          [{ text: 'OK', onPress: () => router.replace('/(root)') }]
        );
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  // Initialize payment sheet on mount
  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.card}>
        <Text style={[styles.title, { color: textColor }]}>Complete Your Donation</Text>
        
        <Text style={[styles.amount, { color: textColor }]}>
          ${amount}
        </Text>
        
        <Text style={[styles.description, { color: textColor }]}>
          Thank you for supporting Orthodox Calendar. Your contribution helps us continue our mission.
        </Text>
        
        <TouchableOpacity 
          style={[styles.payButton, { backgroundColor: primaryColor }]}
          onPress={openPaymentSheet}
          disabled={loading || !clientSecret}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.payButtonText}>Complete Donation</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={[styles.cancelButtonText, { color: textColor }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  payButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 10,
  },
  cancelButtonText: {
    fontSize: 14,
  },
});
