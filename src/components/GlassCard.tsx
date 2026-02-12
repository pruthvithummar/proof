import React, { PropsWithChildren } from 'react';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

export const GlassCard = ({ children }: PropsWithChildren) => (
  <View style={styles.wrapper}>
    <BlurView intensity={20} tint="dark" style={styles.card}>
      {children}
    </BlurView>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  card: {
    padding: 16,
  },
});
