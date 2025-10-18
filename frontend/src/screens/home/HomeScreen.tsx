/**
 * Home Screen
 * Main screen shown after successful authentication
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { commonStyles } from '../../styles/common';
import { colors, spacing } from '../../styles/theme';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView style={commonStyles.container}>
      <View style={commonStyles.contentContainer}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>Welcome to Plate Pilot</Text>
          <Text style={commonStyles.subtitle}>
            Hello, {user?.firstName || 'User'}!
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎯 Your Training Journey</Text>
            <Text style={styles.cardDescription}>
              Ready to start your personalized weightlifting program? Let's create your first mesocycle!
            </Text>
            <TouchableOpacity style={[commonStyles.button, styles.cardButton]}>
              <Text style={commonStyles.buttonText}>Create Program</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Track Progress</Text>
            <Text style={styles.cardDescription}>
              Log your workouts and see your strength gains over time.
            </Text>
            <TouchableOpacity style={[commonStyles.buttonSecondary, styles.cardButton]}>
              <Text style={commonStyles.buttonSecondaryText}>View Progress</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚙️ Settings</Text>
            <Text style={styles.cardDescription}>
              Manage your preferences and account settings.
            </Text>
            <TouchableOpacity style={[commonStyles.buttonSecondary, styles.cardButton]}>
              <Text style={commonStyles.buttonSecondaryText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  content: {
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  cardButton: {
    alignSelf: 'flex-start',
  },
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  logoutButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  logoutText: {
    fontSize: 14,
    color: colors.error,
    fontWeight: '500',
  },
});
