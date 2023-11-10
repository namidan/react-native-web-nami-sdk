import React, { useEffect, useMemo } from "react";
import "react-spring-bottom-sheet/dist/style.css";

import "./PaywallNami.css";

import { interpolate } from "react-nami";

import PaywallPreview from "./PaywallPreview";
import { usePaywallContext } from "./PaywallProvider";
import { prepareAndLoadFonts } from "./utils/fonts";

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
      // TODO obtain this;
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

  return (
    <>
      {template ? (
        renderTemplate()
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <p
            style={{
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            Please select paywall to show
          </p>
        </div>
      )}
    </>
  );
};
