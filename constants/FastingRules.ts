// Define the type for a fasting rule
type FastingRule = {
    symbol: any;
    text: string;
};

export const fastingRules: Record<string, FastingRule> = {
    'Strict Fast': {
        symbol: require('@/assets/icons/strict_fast_icon.webp'),
        text: 'Strict Fast: Refrain from meat, fish, oil, wine, dairy, and eggs.'
    },
    'Wine & Oil': {
        symbol: require('@/assets/icons/wine_oil_icon.webp'),
        text: 'Wine & Oil: Wine and oil are allowed. Refrain from meat, fish, dairy, and eggs.'
    },
    'Fish, oil and wine are allowed': {
        symbol: require('@/assets/icons/fish_icon.webp'),
        text: 'Fish, oil and wine are allowed: Refrain from meat, dairy and eggs.'
    },
    'Dairy Allowed': {
        symbol: require('@/assets/icons/cheese_icon.webp'),
        text: 'Dairy Allowed: Dairy, eggs, fish, oil and wine are allowed. Refrain from meat.'
    },
    'Fast Free': {
        symbol: null,
        text: 'No Symbol - Fast Free: All Foods Allowed.'
    },
};
