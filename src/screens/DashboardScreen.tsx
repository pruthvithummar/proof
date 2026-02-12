import React, { useMemo, useState } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ConfettiCannon from 'react-native-confetti-cannon';
import { colors } from '../theme/colors';
import { useProofStore } from '../store/useProofStore';
import { GlassCard } from '../components/GlassCard';
import { PercentileGlowBadge } from '../components/PercentileGlowBadge';

const width = Dimensions.get('window').width - 32;

export const DashboardScreen = () => {
  const { profile, chartSeries, badges, updateNetWorth, latestBadgeUnlocked } = useProofStore();
  const [showModal, setShowModal] = useState(false);
  const [newWorth, setNewWorth] = useState('');

  const monthlyGrowth = useMemo(() => {
    if (chartSeries.length < 2) return 0;
    const prev = chartSeries[chartSeries.length - 2];
    const current = chartSeries[chartSeries.length - 1];
    return Number((((current - prev) / prev) * 100).toFixed(1));
  }, [chartSeries]);

  if (!profile) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {!!latestBadgeUnlocked && <ConfettiCannon count={70} origin={{ x: width / 2, y: 0 }} fadeOut />}
      <Text style={styles.growth}>{profile.growth_percentage >= 0 ? '+' : ''}{profile.growth_percentage}%</Text>
      <Text style={styles.subLabel}>Net Worth Growth</Text>

      <PercentileGlowBadge percentile={profile.percentile_rank} />

      <GlassCard>
        <LineChart
          data={{ labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'Now'], datasets: [{ data: chartSeries }] }}
          width={width - 32}
          height={180}
          withDots={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withInnerLines={false}
          chartConfig={{
            color: () => colors.accentBlue,
            labelColor: () => colors.textSecondary,
            propsForBackgroundLines: { strokeWidth: 0 },
            backgroundGradientFrom: colors.card,
            backgroundGradientTo: colors.card,
            decimalPlaces: 0,
          }}
          bezier
          style={{ paddingRight: 4 }}
        />
      </GlassCard>

      <View style={styles.metricsRow}>
        <MetricCard label="Current Net Worth" value={`$${profile.current_net_worth.toLocaleString()}`} />
        <MetricCard label="Baseline Value" value={`$${profile.baseline_net_worth.toLocaleString()}`} />
        <MetricCard label="Monthly Growth %" value={`${monthlyGrowth}%`} />
      </View>

      <GlassCard>
        <Text style={styles.badgeTitle}>Recent Achievement</Text>
        <Text style={styles.badgeText}>{badges.find((b) => b.unlocked)?.title ?? 'No unlocked badges yet'}</Text>
      </GlassCard>

      <Pressable style={styles.button} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>Update Net Worth</Text>
      </Pressable>

      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Update Net Worth</Text>
            <TextInput
              value={newWorth}
              onChangeText={setNewWorth}
              keyboardType="numeric"
              placeholder="Enter new value"
              placeholderTextColor={colors.textSecondary}
              style={styles.modalInput}
            />
            <Pressable
              style={styles.button}
              onPress={() => {
                if (Number(newWorth) > 0) {
                  updateNetWorth(Number(newWorth));
                  setShowModal(false);
                  setNewWorth('');
                }
              }}
            >
              <Text style={styles.buttonText}>Save & Recalculate</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <GlassCard>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </GlassCard>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, gap: 16, paddingBottom: 120 },
  growth: { color: colors.textPrimary, fontSize: 52, fontWeight: '800' },
  subLabel: { color: colors.textSecondary, fontSize: 16 },
  metricsRow: { gap: 10 },
  metricLabel: { color: colors.textSecondary, fontSize: 12 },
  metricValue: { color: colors.textPrimary, fontSize: 20, fontWeight: '700' },
  badgeTitle: { color: colors.badgeGold, fontWeight: '700', marginBottom: 6 },
  badgeText: { color: colors.textPrimary },
  button: { backgroundColor: colors.accentBlue, borderRadius: 14, padding: 14 },
  buttonText: { color: colors.textPrimary, textAlign: 'center', fontWeight: '700' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalBody: { backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 12 },
  modalTitle: { color: colors.textPrimary, fontSize: 22, fontWeight: '700' },
  modalInput: { backgroundColor: colors.background, color: colors.textPrimary, borderRadius: 10, padding: 12 },
});
