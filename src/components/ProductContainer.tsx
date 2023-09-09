import React from "react";

import { PaywallStore, type TProductContainer } from "react-nami";
import styled from "styled-components";

import Container from "./Container";
import { transition } from "./css";
import TemplateComponent from "./templateComponent";

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

export const FeaturedContext = React.createContext<boolean | undefined>(
  undefined
);

export default function ProductContainer({
  component,
  inFocusedState,
  groupId,
}: ComponentProps<TProductContainer>): JSX.Element {
  return (
    <Wrapper component={component} inFocusedState={inFocusedState}>
      {PaywallStore.processProductComponents().map((item, index) => (
        <FeaturedContext.Provider key={index} value={item.featured}>
          {item.components.map(
            (child: any, j: React.Key | null | undefined) => (
              <TemplateComponent
                key={`${j}_${index}`}
                component={child}
                inFocusedState={inFocusedState}
                groupId={groupId}
              />
            )
          )}
        </FeaturedContext.Provider>
      ))}
    </Wrapper>
  );
}
