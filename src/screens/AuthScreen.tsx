import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { useProofStore } from '../store/useProofStore';

export const AuthScreen = () => {
  const signInDemo = useProofStore((state) => state.signInDemo);

  return (
    <LinearGradient colors={[colors.background, '#13131A']} style={styles.container}>
      <Text style={styles.title}>Proof</Text>
      <Text style={styles.tagline}>Track your growth. Earn your status.</Text>

      <TextInput placeholder="Email" placeholderTextColor={colors.textSecondary} style={styles.input} />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.primaryButton} onPress={signInDemo}>
        <Text style={styles.primaryButtonText}>Continue with Email</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={signInDemo}>
        <Text style={styles.secondaryButtonText}>Continue with Google</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 14,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 4,
  },
  tagline: {
    color: colors.textSecondary,
    marginBottom: 20,
    fontSize: 16,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: colors.accentBlue,
    padding: 14,
    borderRadius: 14,
  },
  primaryButtonText: {
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.accentPurple,
    padding: 14,
    borderRadius: 14,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '700',
  },
});
