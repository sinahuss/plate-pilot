/**
 * Loading Screen Component
 * Shows a loading indicator while checking authentication status
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { commonStyles } from '../styles/common';
import { colors } from '../styles/theme';

export const LoadingScreen: React.FC = () => {
  return (
    <View style={[commonStyles.container, styles.container]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
});
