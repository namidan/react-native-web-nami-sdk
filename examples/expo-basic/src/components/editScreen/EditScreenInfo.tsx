import React from 'react';
import { Platform } from 'react-native';
import {
  // PaywallNami,
  TestComponentWithButtons,
} from 'react-native-web-nami-sdk';

export default function EditScreenInfo() {
  return (
    <>
      {Platform.OS === 'web' && (
        <TestComponentWithButtons/>
      )}
    </>
  );
}
