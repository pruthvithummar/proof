import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { useProofStore } from '../store/useProofStore';
import { LeaderboardFilter } from '../types';

const filters: LeaderboardFilter[] = ['Age Group', 'Friends', 'Global'];

export const LeaderboardScreen = () => {
  const leaderboard = useProofStore((state) => state.leaderboard);
  const [filter, setFilter] = useState<LeaderboardFilter>('Age Group');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.filterRow}>
        {filters.map((item) => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[styles.filterChip, filter === item && styles.filterChipActive]}
          >
            <Text style={styles.filterText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      {leaderboard.map((entry, index) => {
        const isCurrent = entry.user_id === 'local-user';
        return (
          <View key={entry.user_id} style={[styles.item, isCurrent && styles.currentUser]}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>@{entry.username}</Text>
              <Text style={styles.meta}>Top {Math.max(1, 100 - entry.percentile_rank + 1)}%</Text>
            </View>
            <Text style={styles.growth}>{entry.growth_percentage.toFixed(1)}%</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, gap: 12 },
  title: { color: colors.textPrimary, fontSize: 32, fontWeight: '800' },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterChip: { backgroundColor: colors.card, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 12 },
  filterChipActive: { borderWidth: 1, borderColor: colors.accentBlue },
  filterText: { color: colors.textPrimary, fontWeight: '600' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: colors.card,
  },
  currentUser: {
    borderWidth: 1,
    borderColor: colors.accentBlue,
    shadowColor: colors.accentBlue,
    shadowRadius: 8,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  rank: { color: colors.textSecondary, width: 36 },
  name: { color: colors.textPrimary, fontWeight: '700' },
  meta: { color: colors.textSecondary, fontSize: 12 },
  growth: { color: colors.textPrimary, fontSize: 18, fontWeight: '800' },
});
