/**
 * Register Screen
 * Allows users to create a new account with email, password, firstName, and lastName
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
import { RegisterRequest } from '../../types/auth.types';

export const RegisterScreen: React.FC = () => {
  const { register, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof RegisterRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    setError(null);
    
    // Basic validation
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      await register(formData);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    
    try {
      setIsLoading(true);
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google login failed. Please try again.');
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
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
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
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
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
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
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
                placeholder="Enter your password"
                placeholderTextColor={colors.gray500}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                autoComplete="new-password"
                editable={!isLoading}
              />
              <Text style={styles.passwordHint}>
                Password must be at least 6 characters long
              </Text>
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
              onPress={handleGoogleLogin}
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
  },
  nameInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  passwordHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
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
