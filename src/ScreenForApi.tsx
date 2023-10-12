import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { observer } from "mobx-react";
import { ApiService, PaywallStore, DeviceInfoStore } from "react-nami";

import { CampaignRuleList } from "./campaigns/CampaignsList";

export const TestComponentWithButtons = observer(
  (props: any): React.ReactNode => {
    const apiService = new ApiService({
      platformID: DeviceInfoStore.isAndroid
        ? "b7232eba-ff1d-4b7f-b8d0-55593b66c1d5"
        : "4a2f6dbf-e684-4d65-a4df-0488771c577d",
    });
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      setLoading(true);
      Promise.all([apiService.fetchConfig(), apiService.fetchDevice()])
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          apiService
            .fetchCampaignRules()
            .then((res) => {
              return res;
            })
            .catch((i) => console.log(i));
          apiService.fetchPaywalls();
        })
        .catch((i) => console.log(i));
    }, []);

    return (
      <View
        style={{
          flex: 1,
          padding: 50,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {PaywallStore.campaignRules && (
              <CampaignRuleList
                campaignRules={PaywallStore.campaignRules}
                callback={props.callback}
              />
            )}
          </>
        )}
      </View>
    );
  }
);
