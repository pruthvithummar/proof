import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useProofStore } from '../store/useProofStore';
import { colors } from '../theme/colors';

export const BadgesScreen = () => {
  const badges = useProofStore((state) => state.badges);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Achievement Badges</Text>
      {badges.map((badge) => (
        <View key={badge.id} style={[styles.badge, badge.unlocked ? styles.unlocked : styles.locked]}>
          <Text style={styles.badgeTitle}>{badge.title}</Text>
          <Text style={styles.badgeRequirement}>{badge.requirement}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, gap: 12 },
  title: { color: colors.textPrimary, fontSize: 30, fontWeight: '800' },
  badge: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
  },
  unlocked: {
    backgroundColor: 'rgba(212,175,55,0.08)',
    borderColor: colors.badgeGold,
  },
  locked: {
    backgroundColor: colors.card,
    borderColor: 'rgba(255,255,255,0.08)',
    opacity: 0.55,
  },
  badgeTitle: { color: colors.textPrimary, fontWeight: '700' },
  badgeRequirement: { color: colors.textSecondary, marginTop: 4 },
});
