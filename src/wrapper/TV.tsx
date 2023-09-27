import React from "react";

import styled from "styled-components";

import {
  breakpointXl,
  breakpointXxl,
  colorBlack,
  colorNegative,
} from "../utils/variables";

type TVProps = {
  className?: string;
  children: JSX.Element | JSX.Element[];
  inFocusedState: boolean;
};

const Wrapper = styled.div<{ height: number; scale?: number }>`
  --height: ${({ height }) => height}px;
  width: calc(var(--height) * 1.7777778);
  height: var(--height);
  background-color: ${colorBlack};
  border-radius: 8px;
  margin: -11rem auto 0 -25rem;
  padding: 5px;
  z-index: 2;
  box-shadow: 0 35px 60px -24px rgba(0 0 0 / 0.4);
  user-select: none;

  ${({ scale }) => (scale ? `transform: scale(${scale});` : "")}

  @media only screen and (max-width: ${breakpointXxl}) {
    transform: scale(0.39);
    margin: -15rem auto 0 -31rem;
  }

  @media only screen and (max-width: ${breakpointXl}) {
    transform: scale(0.3);
    margin: -19rem 0 auto -37rem;
  }
`;

const Body = styled.div`
  border-radius: 3px;
  width: 100%;
  height: 100%;
  background-color: ${colorBlack};
  position: relative;
  padding: 5px;
  z-index: 2;
`;

const TVView = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colorNegative};
  border-radius: 3px;
  position: relative;
  overflow: hidden;
`;

export const TVInner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function TV({ children, ...props }: TVProps) {
  return (
    <Wrapper height={1080} scale={0.5} {...props}>
      <Body>
        <TVView>
          <TVInner>{children}</TVInner>
        </TVView>
      </Body>
    </Wrapper>
  );
}
