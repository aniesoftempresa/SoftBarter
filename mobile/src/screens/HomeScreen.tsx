import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SoftBarter</Text>
        <Text style={styles.subtitle}>Trade goods and services with confidence</Text>
      </View>

      {user && (
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back, {user.name}!</Text>
        </View>
      )}

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        
        <View style={styles.feature}>
          <View style={styles.featureNumber}>
            <Text style={styles.featureNumberText}>1</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Create Your Trade</Text>
            <Text style={styles.featureDescription}>
              Post what you have to offer and what you're looking for
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <View style={styles.featureNumber}>
            <Text style={styles.featureNumberText}>2</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Receive Offers</Text>
            <Text style={styles.featureDescription}>
              Browse offers from other traders or wait for them to come to you
            </Text>
          </View>
        </View>

        <View style={styles.feature}>
          <View style={styles.featureNumber}>
            <Text style={styles.featureNumberText}>3</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Complete the Trade</Text>
            <Text style={styles.featureDescription}>
              Accept an offer, meet safely, and complete the exchange
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsSection}>
        {user ? (
          <>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Trades')}
            >
              <Text style={styles.primaryButtonText}>Browse Trades</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('MyTrades')}
            >
              <Text style={styles.secondaryButtonText}>My Trades</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 32,
    paddingVertical: 48,
    alignItems: 'center',
    backgroundColor: '#3b82f6',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#bfdbfe',
    textAlign: 'center',
  },
  welcomeSection: {
    padding: 24,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  featuresSection: {
    padding: 24,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  feature: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  featureNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  actionsSection: {
    padding: 24,
    backgroundColor: '#fff',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;