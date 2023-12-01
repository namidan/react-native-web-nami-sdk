import React from 'react';

import type { TComponent } from 'react-nami';
import styled from 'styled-components';

import { transition } from './css';
import TemplateComponent from './templateComponent';

type FooterProps = {
  components: TComponent[];
  zIndex: number;
  inFocusedState?: boolean;
  groupId: string | null;
};

const Wrapper = styled.div<{ zIndex: number }>`
  text-align: center !important;
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex};
  ${transition()};
`;

export default function Footer({
  components,
  zIndex,
  inFocusedState,
  groupId,
}: FooterProps) {
  if (components.length === 0) return null;
  return (
    <Wrapper zIndex={zIndex}>
      {components.map((component, index) => (
        <TemplateComponent
          key={`footer${index}`}
          component={component}
          inFocusedState={inFocusedState}
          groupId={groupId}
        />
      ))}
    </Wrapper>
  );
}
