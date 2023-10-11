import React from 'react';

import { Platform } from 'react-native';
import { TestComponentWithButtons } from 'react-native-web-nami-sdk';
import { router } from 'expo-router';

export default function TabOneScreen() {
  return (
    <>
      {Platform.OS === 'web' && (
        <TestComponentWithButtons
          callback={() => {
            router.push('/details')
          }}/>
      )}
    </>
  );
}
