import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { observer } from "mobx-react";
import { ApiService, PaywallStore, DeviceInfoStore } from "react-nami";

import { CampaignRuleList } from "./campaigns/CampaignsList";

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
  const apiService = new ApiService({
    platformID: DeviceInfoStore.isAndroid
      ? "b7232eba-ff1d-4b7f-b8d0-55593b66c1d5"
      : "4a2f6dbf-e684-4d65-a4df-0488771c577d",
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiService.fetchConfig(),
      apiService.fetchDevice(mockDeviceConfig),
    ])
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        apiService
          .fetchCampaignRules()
          .then((res) => {
            console.log(res, "onPressCampaignRules");
            return res;
          })
          .catch((i) => console.log(i));
        apiService.fetchPaywalls();
      })
      .catch((i) => console.log(i));
  }, []);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {PaywallStore.campaignRules && (
            <CampaignRuleList campaignRules={PaywallStore.campaignRules} />
          )}
        </>
      )}
    </View>
  );
});
