import React from 'react';
import { Stack } from 'expo-router';
import { RootProviders } from '@/RootProviders';

export default function RootLayout(): React.ReactElement {
  return (
    <RootProviders>
      <Stack
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
      </Stack>
    </RootProviders>
  );
}
