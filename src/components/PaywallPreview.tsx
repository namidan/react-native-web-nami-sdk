import React from "react";

// import { TDevice, TDeviceOrientation } from "src/api/types/paywall.types";

// import BackgroundContainer from "./components/BackgroundContainer";
// import Content from "./components/Content";
// import Footer from "./components/Footer";
// import { TDevice, TDeviceOrientation } from "src/api/types/paywall.types";
// import BackgroundContainer from "./components/BackgroundContainer";
// import Content from "./components/Content";
// import Footer from "./components/Footer";
import type { TPaywallTemplate } from "react-nami";

import BackgroundContainer from "./BackgroundContainer";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import MainContainer from "./PaywallPreviewWrapper";
// import { TPaywallTemplate } from "../../api/types/paywallTemplate.types";

type PaywallPreviewProps = {
  template: TPaywallTemplate;
  // orientation: TDeviceOrientation;
  focusedState: boolean;
  currentPage: string;
  groupId: string | null;
};

export default function PaywallPreview({
  template,
  focusedState,
  currentPage,
  groupId,
}: PaywallPreviewProps) {
  const { pages, initialState } = template;

  const {
    header,
    backgroundContainer: background,
    contentContainer: content,
    footer,
  } = pages.find((page) => page.name === currentPage) || pages[0];

  return (
    <MainContainer>
      <BackgroundContainer
        // @ts-ignore null assertion
        component={background}
        zIndex={1}
        fullscreen={initialState?.fullScreenPresentation}
        groupId={groupId}
      />
      <Header
        components={header || []}
        zIndex={2}
        inFocusedState={focusedState}
        inFullScreen={initialState?.fullScreenPresentation}
        groupId={groupId}
      />
      <Content
        component={content}
        zIndex={2}
        inFocusedState={focusedState}
        groupId={groupId}
      />
      <Footer
        components={footer || []}
        zIndex={3}
        inFocusedState={focusedState}
        groupId={groupId}
      />
    </MainContainer>
  );
}
