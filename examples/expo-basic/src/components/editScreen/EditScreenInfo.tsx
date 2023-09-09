import React from 'react';
import { Platform } from 'react-native';
import { ButtonNami } from 'react-native-web-nami-sdk';

export default function EditScreenInfo() {
  return (
    <>
      {Platform.OS === 'web' && (
        <ButtonNami label={'web button'}/>
      )}
    </>
  );
}
