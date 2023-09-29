import React from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { PaywallStore } from "react-nami";

export function CampaignRuleList(props: any) {
  const { campaignRules } = props;

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => {
        PaywallStore.setSelectedPaywallId(item.paywall);
      }}
      style={styles.buttonContainer}
    >
      <Text style={styles.buttonText}>Name: {item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
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
    backgroundColor: "#007AFF", // Change to your preferred button background color
    padding: 16, // Adjust padding for button size
    borderRadius: 8, // Adjust border radius for button shape
    marginBottom: 12, // Adjust margin between buttons
    alignItems: "center", // Center text horizontally
  },
  buttonText: {
    color: "#FFFFFF", // Change to your preferred text color
    fontSize: 18, // Adjust font size
  },
});
