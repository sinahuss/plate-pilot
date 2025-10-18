/**
 * Register Screen
 * Allows users to create a new account with email, password, first name, and last name
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { commonStyles } from '../../styles/common';
import { colors, spacing } from '../../styles/theme';

export const RegisterScreen: React.FC = () => {
  const { register, loginWithGoogle } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await register({
        email: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError(null);
    
    try {
      setIsLoading(true);
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={commonStyles.contentContainer}>
          <Text style={[commonStyles.title, commonStyles.textCenter]}>Plate Pilot</Text>
          <Text style={[commonStyles.subtitle, commonStyles.textCenter]}>Create your account</Text>

          {error && (
            <View style={commonStyles.errorContainer}>
              <Text style={commonStyles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.form}>
            <View style={styles.nameRow}>
              <View style={[commonStyles.inputContainer, styles.nameInput]}>
                <Text style={commonStyles.label}>First Name</Text>
                <TextInput
                  style={commonStyles.input}
                  placeholder="First name"
                  placeholderTextColor={colors.gray500}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  autoComplete="given-name"
                  editable={!isLoading}
                />
              </View>

              <View style={[commonStyles.inputContainer, styles.nameInput]}>
                <Text style={commonStyles.label}>Last Name</Text>
                <TextInput
                  style={commonStyles.input}
                  placeholder="Last name"
                  placeholderTextColor={colors.gray500}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  autoComplete="family-name"
                  editable={!isLoading}
                />
              </View>
            </View>

            <View style={commonStyles.inputContainer}>
              <Text style={commonStyles.label}>Email</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.gray500}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!isLoading}
              />
            </View>

            <View style={commonStyles.inputContainer}>
              <Text style={commonStyles.label}>Password</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Create a password"
                placeholderTextColor={colors.gray500}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="new-password"
                editable={!isLoading}
              />
            </View>

            <View style={commonStyles.inputContainer}>
              <Text style={commonStyles.label}>Confirm Password</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Confirm your password"
                placeholderTextColor={colors.gray500}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoComplete="new-password"
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[commonStyles.button, isLoading && commonStyles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={commonStyles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <Text style={styles.dividerText}>or</Text>
            </View>

            <TouchableOpacity
              style={[commonStyles.buttonSecondary, isLoading && commonStyles.buttonDisabled]}
              onPress={handleGoogleRegister}
              disabled={isLoading}
            >
              <Text style={commonStyles.buttonSecondaryText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity disabled={isLoading}>
                <Text style={commonStyles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    width: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.base,
  },
  nameInput: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: colors.textSecondary,
    marginHorizontal: spacing.base,
  },
});