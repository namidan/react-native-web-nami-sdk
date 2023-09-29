import React, { useEffect } from "react";
import { Button, View } from "react-native";

import { observer } from "mobx-react";
import { ApiService, PaywallStore } from "react-nami";

import { CampaignRuleList } from "./campaigns/CampaignsList";

const apiService = new ApiService({
  platformID: "4a2f6dbf-e684-4d65-a4df-0488771c577d",
});

const mockDeviceConfig = {
  device_model: "iPad",
  language: "ru",
  extended_platform_version: "3.0.30",
  marketplace_country: "USA",
  sdk_client: "apple",
  sdk_version: "3.1.6",
  app_version: "1.0",
  app_env: "simulator_development",
  os_version: "16.0",
  os_name: "iPadOS",
  country: "US",
  extended_platform: "react-native",
  form_factor: "tablet",
};

export const TestComponentWithButtons = observer((): React.ReactNode => {
  useEffect(() => {
    Promise.all([
      apiService.fetchConfig(),
      apiService.fetchDevice(mockDeviceConfig),
    ])
      .finally(() => {
        apiService.fetchPaywalls();
      })
      .catch((i) => console.log(i));
  }, []);

  const onPressCampaignRules = () => {
    apiService
      .fetchCampaignRules()
      .then((res) => {
        console.log(res, "onPressCampaignRules");
        return res;
      })
      .catch((i) => console.log(i));
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Button
        onPress={onPressCampaignRules}
        title="Load campaigns"
        accessibilityLabel="Learn more about this purple button"
      />
      {PaywallStore.campaignRules && (
        <CampaignRuleList campaignRules={PaywallStore.campaignRules} />
      )}
    </View>
  );
});
