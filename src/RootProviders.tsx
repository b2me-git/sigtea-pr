import React, { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes (formerly cacheTime)
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * Root Providers Component
 *
 * Wraps all providers necessity for the app:
 * - QueryClientProvider (React Query)
 * - GestureHandlerRootView (React Native Gesture Handler)
 * - Future: Theme, Auth, etc.
 */
interface RootProvidersProps {
  children: React.ReactNode;
}

export function RootProviders({ children }: RootProvidersProps): React.ReactElement {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
