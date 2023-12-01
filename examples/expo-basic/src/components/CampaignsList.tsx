import React from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { usePaywallContext } from 'react-native-web-nami-sdk';

export function CampaignRuleList(props: any) {
  const { campaignRules } = props;
  const { setPaywallId } : any = usePaywallContext();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => {
        setPaywallId(item.paywall)
      }}
      style={styles.buttonContainer}
    >
      <Text style={styles.buttonText}>Name: {item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={campaignRules}
        renderItem={renderItem}
        keyExtractor={(rule, index) => `${rule}_${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
