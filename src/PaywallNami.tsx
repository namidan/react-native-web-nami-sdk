import React, { useEffect, useMemo } from "react";
import "react-spring-bottom-sheet/dist/style.css";

import { observer } from "mobx-react";
import { PaywallStore } from "react-nami";
import "./PaywallNami.css";

import PaywallPreview from "./PaywallPreview";
import { interpolate } from "./utils/allUtils";
import { loadFonts } from "./utils/fonts";

export const PaywallNami: React.FC = observer(() => {
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

  // console.log(template, "template");

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
      currentGroupId,
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
        groupId={currentGroupId}
      />
    );
  };

  return <>{renderTemplate()}</>;
});
