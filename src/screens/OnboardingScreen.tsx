import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useProofStore } from '../store/useProofStore';
import { AgeGroup } from '../types';
import { colors } from '../theme/colors';

const ageGroups: AgeGroup[] = ['18–22', '23–27', '28–35', '36–45', '46+'];

export const OnboardingScreen = () => {
  const completeOnboarding = useProofStore((state) => state.completeOnboarding);
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('23–27');
  const [baseline, setBaseline] = useState('10000');

  const canContinue = useMemo(() => {
    if (step === 0) return username.trim().length >= 3;
    if (step === 2) return Number(baseline) > 0;
    return true;
  }, [baseline, step, username]);

  const finish = () => {
    completeOnboarding({ username: username.trim(), ageGroup, baseline: Number(baseline) });
  };

  return (
    <View style={styles.container}>
      {step === 0 && (
        <>
          <Text style={styles.title}>Welcome to Proof</Text>
          <Text style={styles.subtitle}>Track your growth. Earn your status.</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Choose username"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />
        </>
      )}

      {step === 1 && (
        <>
          <Text style={styles.title}>Select Age Group</Text>
          <View style={styles.grid}>
            {ageGroups.map((group) => (
              <Pressable
                key={group}
                onPress={() => setAgeGroup(group)}
                style={[styles.option, ageGroup === group && styles.optionActive]}
              >
                <Text style={styles.optionText}>{group}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>Set Starting Net Worth</Text>
          <TextInput
            value={baseline}
            onChangeText={setBaseline}
            keyboardType="numeric"
            style={styles.input}
            placeholder="0"
            placeholderTextColor={colors.textSecondary}
          />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>Confirm</Text>
          <Text style={styles.summary}>@{username}</Text>
          <Text style={styles.summary}>{ageGroup}</Text>
          <Text style={styles.summary}>Baseline ${Number(baseline).toLocaleString()}</Text>
        </>
      )}

      <Pressable
        style={[styles.button, !canContinue && { opacity: 0.5 }]}
        disabled={!canContinue}
        onPress={() => (step < 3 ? setStep(step + 1) : finish())}
      >
        <Text style={styles.buttonText}>{step < 3 ? 'Continue' : 'Enter Dashboard'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background, justifyContent: 'center', gap: 16 },
  title: { color: colors.textPrimary, fontSize: 34, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 16, marginBottom: 10 },
  input: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    color: colors.textPrimary,
  },
  grid: { gap: 10 },
  option: {
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionActive: { borderColor: colors.accentBlue },
  optionText: { color: colors.textPrimary, fontWeight: '600' },
  summary: { color: colors.textPrimary, fontSize: 18 },
  button: {
    marginTop: 8,
    backgroundColor: colors.accentPurple,
    borderRadius: 14,
    padding: 15,
  },
  buttonText: { color: colors.textPrimary, textAlign: 'center', fontWeight: '700' },
});
