import React, { useEffect, useMemo } from "react";
import "react-spring-bottom-sheet/dist/style.css";

import { PaywallStore } from "react-nami";

import PaywallPreview from "./components/PaywallPreview";
import { interpolate } from "./utils/allUtils";
import { loadFonts } from "./utils/fonts";

interface ButtonProps {
  label: string;
}

export const ButtonNami: React.FC<ButtonProps> = () => {
  const {
    payWall: template,
    launch,
    initialState: { groups, selectedProducts, currentPage, currentGroupId },
    skuHasOffer: {
      anySkuHasTrialOffer,
      anySkuHasIntroOffer,
      anySkuHasPromoOffer,
    },
    currentFontsArray,
  } = PaywallStore;
  const focusedState = true;

  useEffect(() => {
    loadFonts(currentFontsArray);
  }, [currentFontsArray]);

  const parsedTemplate = useMemo(() => {
    if (template === null) return null;
    // TODO: Do we need citation?
    // const citation = citations[language] || citations[defaultLanguage] || null;
    const state = {
      ...(template.initialState || {}),
      groups,
      launch,
      currentGroupId: "3f2fcdbf-fe89-49fb-8740-e9efd6234d00",
      selectedProducts,
      anySkuHasTrialOffer,
      anySkuHasIntroOffer,
      anySkuHasPromoOffer,
      currentPage,
      // TODO obtain this later;
      focusedState,
      safeAreaTop: 40,
      isLoggedIn: false,
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
    currentGroupId,
    anySkuHasTrialOffer,
    anySkuHasIntroOffer,
    anySkuHasPromoOffer,
    currentPage,
    selectedProducts,
    // variables,
    // citations,
    // defaultLanguage,
    // language,
    // iconsQuery.data,
    // mediaList,
    // inDarkMode,
    // orientation,
    // focusedState,
    // safeAreaTop,
    // isLoggedIn,
    // customer,
  ]);
  const renderTemplate = () => {
    return (
      <PaywallPreview
        template={parsedTemplate!}
        focusedState={focusedState}
        currentPage={currentPage}
        groupId={"3f2fcdbf-fe89-49fb-8740-e9efd6234d00"}
      />
    );
  };

  return <>{renderTemplate()}</>;
};
