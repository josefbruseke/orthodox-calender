import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';


export default function DonationScreen() {
    const [publishableKey, setPublishableKey] = useState('');

    const fetchPublishableKey = async () => {
        const key = await fetchKey(); // fetch key from your server here
        setPublishableKey(key);
    };

    useEffect(() => {
        fetchPublishableKey();
    }, []);

    return (
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
        </StripeProvider>
    );
}

function fetchKey() {
    throw new Error('Function not implemented.');
}

