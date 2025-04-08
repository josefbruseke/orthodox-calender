import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/HapticTab';
import { Ionicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: '#FFFFFF', // White for selected tab
          tabBarInactiveTintColor: 'rgba(255,255,255,0.7)', // Slightly transparent white
          tabBarShowLabel: true,
        }}
      >
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <View style={styles.iconContainer}>
                <Ionicons name="calendar" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Today',
            tabBarIcon: ({ color, size }) => (
              <View style={styles.iconContainer}>
                <Ionicons name="home" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="legend"
          options={{
            title: 'Legend',
            tabBarIcon: ({ color, size }) => (
              <View style={styles.iconContainer}>
                <Ionicons name="book" size={size} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F8',
  },
  tabBar: {
    backgroundColor: '#D9534F', // Brighter red
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 60, // Reduced height
    paddingBottom: 0,
    borderRadius: 30, // More rounded
    marginHorizontal: 20,
    marginBottom: 10,
    overflow: 'hidden',
  },
  tabBarItem: {
    paddingVertical: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  iconContainer: {
    padding: 4,
  },
  // Active indicator
  tabBarIndicator: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 3,
    width: '30%',
    position: 'absolute',
    bottom: 0,
    left: '35%',
    borderRadius: 2,
  },
});