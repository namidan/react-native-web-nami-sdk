import React from "react";

import type { TContainer } from "react-nami";
import styled from "styled-components";

import Container from "./Container";
import { transition } from "./css";
import TemplateComponent from "./templateComponent";

type ContentProps = {
  component: TContainer | null;
  zIndex: number;
  inFocusedState: boolean;
  groupId: string | null;
};

const Wrapper = styled(Container)<{ zIndex: number }>`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: start;
  z-index: ${({ zIndex }) => zIndex};
  ${transition()};
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  cursor: all-scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default function Content({
  component,
  zIndex,
  inFocusedState,
  groupId,
}: ContentProps) {
  if (component === null) return null;
  return (
    <Wrapper
      zIndex={zIndex}
      component={component}
      inFocusedState={inFocusedState}
    >
      {(component.components || []).map((child, i) => (
        <TemplateComponent
          key={i}
          component={child}
          inFocusedState={inFocusedState}
          groupId={groupId}
        />
      ))}
    </Wrapper>
  );
}
