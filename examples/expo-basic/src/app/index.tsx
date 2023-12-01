import React from 'react';

import { TestComponentWithButtons } from '../components/ScreenForApi';
import { Platform } from 'react-native';
export default function TabOneScreen() {
  return (
    <>
      {Platform.OS === 'web' && (
        <TestComponentWithButtons/>
      )}
    </>
  );
}
