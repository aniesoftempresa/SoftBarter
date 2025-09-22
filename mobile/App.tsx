import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#3b82f6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ title: 'SoftBarter' }}
    />
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ title: 'Sign In' }}
    />
    <Stack.Screen 
      name="Register" 
      component={LoginScreen} 
      options={{ title: 'Sign Up' }}
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#3b82f6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ title: 'SoftBarter' }}
    />
    <Stack.Screen 
      name="Trades" 
      component={() => (
        <View style={styles.placeholderContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}
      options={{ title: 'Browse Trades' }}
    />
    <Stack.Screen 
      name="MyTrades" 
      component={() => (
        <View style={styles.placeholderContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}
      options={{ title: 'My Trades' }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return user ? <AppStack /> : <AuthStack />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#3b82f6" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
});
