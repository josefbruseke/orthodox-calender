import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { StripeProvider } from '@stripe/stripe-react-native';

const donationAmounts = [5, 10, 25, 50, 100];

// Your Stripe publishable key - in production, you should use environment variables
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RDvMDB9lbgTN2fPiJoLGDbkrh45bpqWVninwhy6QvE5tIx9dcjbGMwNfKf6ay7Cr1pXjOQZgxrweuMlyZcOhY5q00l3aDr8eh';

export default function DonationScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const router = useRouter();
  
  // Get theme colors
  const backgroundColor = useThemeColor({ light: '#f2f2f2', dark: '#111' }, 'background');
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const primaryColor = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');

  const handleContinue = () => {
    const amount = selectedAmount || Number(customAmount);
    if (amount && amount > 0) {
      router.push({
        pathname: '/donation/checkout',
        params: { amount }
      });
    }
  };

  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.com.orthodoxcalendar" // required for Apple Pay
      urlScheme="orthodoxcalendar" // required for 3D Secure and bank redirects
    >
      <ScrollView style={[styles.container, { backgroundColor }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: textColor }]}>Support Orthodox Calendar</Text>
          
          <Text style={[styles.description, { color: textColor }]}>
            Your donation helps us maintain and improve the Orthodox Calendar app. 
            Thank you for your support!
          </Text>

          <View style={styles.amountsContainer}>
            {donationAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountButton,
                  selectedAmount === amount && { backgroundColor: primaryColor }
                ]}
                onPress={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
              >
                <Text 
                  style={[
                    styles.amountText, 
                    { color: selectedAmount === amount ? '#fff' : textColor }
                  ]}
                >
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Custom amount input would go here - can be implemented with TextInput */}
          
          <TouchableOpacity
            style={[
              styles.donateButton,
              { backgroundColor: primaryColor, opacity: selectedAmount ? 1 : 0.7 }
            ]}
            onPress={handleContinue}
            disabled={!selectedAmount && !customAmount}
          >
            <Text style={styles.donateButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  amountsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  amountButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '600',
  },
  donateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  donateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

