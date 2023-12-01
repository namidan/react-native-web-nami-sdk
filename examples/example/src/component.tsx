import * as React from 'react';

import { PaywallNami, usePaywallContext } from 'react-native-web-nami-sdk';
export const Component = () => {
  const {
    selectedPaywall,
    campaignRules,
    setPaywallId,
  }: any = usePaywallContext();
  return (
    <div>
      {selectedPaywall ? (
        <PaywallNami />
      ) : (
        <>
          {campaignRules.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  setPaywallId(item.paywall);
                }}
              >
                {item.name}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
