import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '@config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray[600],
  },
});

export default function Index(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGTEA/PR</Text>
      <Text style={styles.subtitle}>
        Mobile app com React Native + Expo + TypeScript
      </Text>
    </View>
  );
}
