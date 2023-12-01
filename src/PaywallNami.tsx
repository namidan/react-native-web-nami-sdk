import React, { useEffect, useMemo } from 'react';
import './PaywallNami.css';

import { interpolate } from 'react-nami';

import PaywallPreview from './PaywallPreview';
import { usePaywallContext } from './PaywallProvider';
import { prepareAndLoadFonts } from './utils/fonts';

export const PaywallNami: React.FC = () => {
  const {
    selectedPaywall: { template, fonts },
    launch,
    initialStateData: { groups, selectedProducts, currentPage, currentGroupId },
    skuHasOffer: {
      anySkuHasTrialOffer,
      anySkuHasIntroOffer,
      anySkuHasPromoOffer,
    },
  }: any = usePaywallContext();

  const focusedState = true;

  useEffect(() => {
    prepareAndLoadFonts(fonts);
  }, [fonts]);

  const parsedTemplate = useMemo(() => {
    if (template === null) return null;
    const state = {
      ...(template!.initialState ?? {}),
      groups,
      launch,
      currentGroupId,
      selectedProducts,
      anySkuHasTrialOffer,
      anySkuHasIntroOffer,
      anySkuHasPromoOffer,
      currentPage,
      focusedState,
      safeAreaTop: 40,
      isLoggedIn: false,
    };
    const replacements = {
      state,
      launch,
    };
    return interpolate(template, interpolate(replacements, replacements));
  }, [
    template,
    groups,
    launch,
    currentGroupId,
    anySkuHasTrialOffer,
    anySkuHasIntroOffer,
    anySkuHasPromoOffer,
    currentPage,
    selectedProducts,
  ]);

  return (
    <PaywallPreview
      template={parsedTemplate!}
      focusedState={focusedState}
      currentPage={currentPage}
      groupId={currentGroupId}
    />
  );
};
