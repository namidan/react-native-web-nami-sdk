import React from "react";

import type { TContainer } from "react-nami";
import { withOverrides } from "react-nami";
import styled, { css } from "styled-components";

import {
  paddingAndMargin,
  pickAndApplyBackgroundColor,
  transition,
} from "./css";
import TemplateComponent from "./templateComponent";

type BackgroundContainerProps = {
  component: TContainer;
  zIndex: number;
  fullscreen?: boolean;
  groupId: string | null;
};

const Wrapper = styled.div<Omit<BackgroundContainerProps, "device">>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: -1px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${({ component, zIndex }) => css`
    z-index: ${zIndex};
    border-radius: ${0}px;
    top: ${0}px;
    ${pickAndApplyBackgroundColor(component)}
    ${transition()}
    ${paddingAndMargin(component)}
  `}
`;

export default function BackgroundContainer({
  component,
  zIndex,
  fullscreen,
  groupId,
}: BackgroundContainerProps) {
  return (
    <Wrapper
      component={withOverrides(component)}
      zIndex={zIndex}
      fullscreen={fullscreen}
      groupId={groupId}
    >
      {(component.components || []).map((child, i) => (
        <TemplateComponent key={i} component={child} groupId={groupId} />
      ))}
    </Wrapper>
  );
}
