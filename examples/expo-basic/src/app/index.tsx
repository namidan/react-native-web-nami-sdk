import React from 'react';

import { Platform } from 'react-native';
import { router } from 'expo-router';
import { TestComponentWithButtons } from '../components/ScreenForApi';

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
