import React from 'react';

import type { TProductContainer } from 'react-nami';
import { processProductComponents } from 'react-nami';
import styled from 'styled-components';

import { usePaywallContext } from '../PaywallProvider';
import Container from './Container';
import { transition } from './css';
import TemplateComponent from './templateComponent';
import { FeaturedContext } from '../contexts/context';

type ComponentProps<T> = {
  component: T;
  inFocusedState?: boolean;
  groupId: string | null;
};

const Wrapper = styled(Container)`
  ${transition()}
  display: flex;
  justify-content: center;
`;

export default function ProductContainer({
  component,
  inFocusedState,
  groupId,
}: ComponentProps<TProductContainer>): JSX.Element {
  const { selectedPaywall } = usePaywallContext();
  const components = processProductComponents(
    component,
    groupId,
    selectedPaywall
  );

  return (
    <Wrapper component={component} inFocusedState={inFocusedState}>
      {components.map(([featured, children], i) => {
        return (
          <FeaturedContext.Provider key={i} value={featured}>
            {children.map((child: any, j: React.Key | null | undefined) => (
              <TemplateComponent
                key={j}
                component={child}
                inFocusedState={inFocusedState}
                groupId={groupId}
              />
            ))}
          </FeaturedContext.Provider>
        );
      })}
    </Wrapper>
  );
}
