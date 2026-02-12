import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export const PercentileGlowBadge = ({ percentile }: { percentile: number }) => (
  <View style={styles.badge}>
    <Text style={styles.text}>Top {Math.max(1, 100 - percentile + 1)}% in your age group</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(59,130,246,0.15)',
    borderWidth: 1,
    borderColor: colors.accentBlue,
    shadowColor: colors.accentBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  text: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
