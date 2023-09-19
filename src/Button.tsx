import React, { useMemo } from "react";
import "react-spring-bottom-sheet/dist/style.css";

import { PaywallStore } from "react-nami";

import PaywallPreview from "./components/PaywallPreview";
import { buildStateGroups, interpolate } from "./utils/allUtils";

interface ButtonProps {
  label: string;
}

export const ButtonNami: React.FC<ButtonProps> = () => {
  const template = PaywallStore.payWall;
  const groups = buildStateGroups(PaywallStore.skuProducts);
  const launch = PaywallStore.launch;

  const parsedTemplate = useMemo(() => {
    if (template === null) return null;
    // const citation = citations[language] || citations[defaultLanguage] || null;
    const state = {
      ...(template.initialState || {}),
      groups,
      launch: PaywallStore.launch,
      currentGroupId: PaywallStore.currentGroupId,
      selectedProducts: PaywallStore.initialState.selectedProducts,
      safeAreaTop: 40,
      isLoggedIn: false,
      anySkuHasTrialOffer: PaywallStore.skuHasOffer.anySkuHasTrialOffer,
      anySkuHasIntroOffer: PaywallStore.skuHasOffer.anySkuHasIntroOffer,
      anySkuHasPromoOffer: PaywallStore.skuHasOffer.anySkuHasPromoOffer,
      currentPage: PaywallStore.initialState.currentPage,
      // handle hovers for that
      focusedState: true,
    };
    const replacements = {
      state,
      launch,
      // customer,
      // var: variables,
      // media: buildMediaVariables(mediaList, { convertToUrl: true }),
      // legal: citation ? buildLegalVariables(citation) : {},
      // icon: (iconsQuery.data || []).reduce((output, icon) => {
      //   return { ...output, [icon.name]: icon.ant };
      // }, {}),
    };
    return interpolate(template, interpolate(replacements, replacements));
  }, [
    template,
    groups,
    launch,
    // variables,
    // citations,
    // defaultLanguage,
    // language,
    // iconsQuery.data,
    // currentGroupId,
    // mediaList,
    // selectedProducts,
    // inDarkMode,
    // orientation,
    // focusedState,
    // safeAreaTop,
    // isLoggedIn,
    // anySkuHasTrialOffer,
    // anySkuHasIntroOffer,
    // anySkuHasPromoOffer,
    // currentPage,
    // customer,
  ]);
  const renderBottomSheet = () => {
    return (
      <PaywallPreview
        template={parsedTemplate!}
        focusedState={true}
        currentPage={"1"}
        groupId={"c9c90c98-388c-46e3-8b9b-f5827985f8b3"}
      />
    );
  };

  return <>{renderBottomSheet()}</>;
};
