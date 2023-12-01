import React, { ReactNode } from 'react';

import styled from 'styled-components';

type MainContainerProps = {
  children: ReactNode | ReactNode[];
};

const InnerDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: initial;
`;

export default function MainContainer({ children }: MainContainerProps) {
  return <InnerDiv>{children}</InnerDiv>;
}
