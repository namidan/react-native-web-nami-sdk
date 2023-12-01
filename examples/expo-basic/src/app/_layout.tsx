import React from 'react';
import { Stack } from 'expo-router';
import { usePaywall } from 'react-nami';
import { PaywallProvider } from 'react-native-web-nami-sdk';

export {
  ErrorBoundary,
} from 'expo-router';

function RootLayoutNav() {
  const { state, actions } = usePaywall('4a2f6dbf-e684-4d65-a4df-0488771c577d');
  console.log(state, 'usePaywall')

  return (
    <PaywallProvider
      state={state}
      actions={actions}>
      <Stack>
        <Stack.Screen
          name='index'
          options={{ headerShown: false }} />
      </Stack>
    </PaywallProvider>
  );
}

export default function RootLayout() {
  return (
    <RootLayoutNav />
  );
}
