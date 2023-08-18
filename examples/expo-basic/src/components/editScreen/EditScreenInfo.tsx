import React from 'react';
import { Button, Platform, StyleSheet } from 'react-native';

import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';
import { ButtonNami } from 'react-native-web-nami-sdk';
import { ApiService } from 'react-nami';


export default function EditScreenInfo({ path }: { path: string }) {
  const apiService = new ApiService({
    platformID: 'test_id',
  });
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Open up modal screen on web:
        </Text>
        {Platform.OS === 'web' ? (
          <ButtonNami label={'web button'}/>
        ) : (
          <Button
            onPress={() => {
              apiService.fetchPaywalls().then(res => console.log(res))
            }}
            title={'Native button'}/>
        )}
        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{path}</MonoText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
