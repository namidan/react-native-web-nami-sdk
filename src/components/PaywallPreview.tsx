import React from "react";

import type { TPaywallTemplate } from "react-nami";

import BackgroundContainer from "./BackgroundContainer";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import MainContainer from "./PaywallPreviewWrapper";

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
        component={background!}
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
