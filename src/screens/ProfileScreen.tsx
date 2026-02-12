import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useProofStore } from '../store/useProofStore';
import { colors } from '../theme/colors';

export const ProfileScreen = () => {
  const { profile, badges, toggleProfileVisibility } = useProofStore();
  if (!profile) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{profile.username.slice(0, 1).toUpperCase()}</Text>
      </View>
      <Text style={styles.username}>@{profile.username}</Text>
      <Text style={styles.meta}>{profile.age_group}</Text>
      <Text style={styles.growth}>{profile.growth_percentage.toFixed(1)}% Total Growth</Text>
      <Text style={styles.meta}>Top {Math.max(1, 100 - profile.percentile_rank + 1)}% percentile</Text>

      <View style={styles.toggleRow}>
        <Text style={styles.meta}>Public Profile</Text>
        <Switch value={profile.public_profile} onValueChange={toggleProfileVisibility} />
      </View>

      <Pressable style={styles.editButton}>
        <Text style={styles.editText}>Edit Profile</Text>
      </Pressable>

      <Text style={styles.section}>Earned Badges</Text>
      {badges.filter((b) => b.unlocked).map((badge) => (
        <Text key={badge.id} style={styles.badgeItem}>• {badge.title}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, gap: 10, alignItems: 'flex-start' },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accentBlue,
  },
  avatarText: { color: colors.textPrimary, fontWeight: '800', fontSize: 26 },
  username: { color: colors.textPrimary, fontWeight: '800', fontSize: 30 },
  growth: { color: colors.textPrimary, fontWeight: '700', fontSize: 22 },
  meta: { color: colors.textSecondary, fontSize: 15 },
  toggleRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  editButton: { backgroundColor: colors.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  editText: { color: colors.textPrimary, fontWeight: '600' },
  section: { color: colors.badgeGold, fontWeight: '700', fontSize: 18, marginTop: 8 },
  badgeItem: { color: colors.textPrimary },
});
