import React from "react";

import { PaywallStore, type TFlexProductContainer } from "react-nami";
import styled from "styled-components";

import Container from "./Container";
import { transition } from "./css";
import TemplateComponent from "./templateComponent";
import { FeaturedContext } from "../contexts/context";

type ComponentProps<T> = {
  component: T;
  inFocusedState?: boolean;
  groupId: string | null;
};

const Wrapper = styled(Container)<{ flexDirectionData: any }>`
  ${transition()}
  display: flex;
  justify-content: center;

  @media (max-width: 510px) {
    // TODO: Temp solution
    row-gap: 24px;
  }
  @media (max-width: 825px) {
    flex-direction: ${(props) => props.flexDirectionData.small && "column"};
    // TODO: Temp solution
    row-gap: 24px;
  }
  @media (min-width: 1000px) and (max-width: 1024px) {
    flex-direction: ${(props) => props.flexDirectionData.medium && "row"};
  }
  @media (min-width: 1200px) and (max-width: 1440px) {
    flex-direction: ${(props) => props.flexDirectionData.large && "row"};
  }
  @media (min-width: 1600px) {
    flex-direction: ${(props) => props.flexDirectionData.xlarge && "row"};
  }
`;

export default function FlexProductContainer({
  component,
  inFocusedState,
  groupId,
}: ComponentProps<TFlexProductContainer>): JSX.Element {
  const components = PaywallStore.processProductComponents(component, groupId);
  return (
    <Wrapper
      flexDirectionData={component.flexDirection}
      component={component}
      inFocusedState={inFocusedState}
    >
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
