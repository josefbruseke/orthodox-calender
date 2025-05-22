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
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
          tabBarShowLabel: false,
          tabBarIconStyle: styles.tabBarIcon,
        }}
      >
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Today',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="about-us"
          options={{
            title: 'About us',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="gift" size={26} color={color} />
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
    paddingTop: 20, // Add padding to the top of the container
  },
  tabBar: {
    backgroundColor: '#D9534F',
    height: 60,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarIcon: {
    marginTop: 8, // This will push the icons down for better vertical centering
  },
});