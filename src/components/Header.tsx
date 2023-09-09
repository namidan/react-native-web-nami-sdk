import React from "react";

import type { TComponent } from "react-nami";
import styled, { css } from "styled-components";

import { transition } from "./css";
import TemplateComponent from "./templateComponent";

type HeaderProps = {
  components: TComponent[];
  zIndex: number;
  inFocusedState?: boolean;
  inFullScreen?: boolean;
  groupId: string | null;
};

const Wrapper = styled.div<Omit<HeaderProps, "components">>`
  display: flex;
  width: 100%;
  ${({ inFullScreen }) => css`
    margin-top: ${!inFullScreen ? 40 : 0}px;
  `}
  z-index: ${({ zIndex }) => zIndex};
  align-items: center;
  justify-content: center;
  ${transition()};
`;

export default function Header({
  components,
  zIndex,
  inFocusedState,
  inFullScreen,
  groupId,
}: HeaderProps) {
  // console.log(components, "HEADER components");
  return (
    <Wrapper
      zIndex={zIndex}
      inFocusedState={inFocusedState}
      inFullScreen={inFullScreen}
      groupId={groupId}
    >
      {components.map((component, i) => (
        <TemplateComponent
          key={i}
          component={component}
          inFocusedState={inFocusedState}
          groupId={groupId}
        />
      ))}
    </Wrapper>
  );
}
