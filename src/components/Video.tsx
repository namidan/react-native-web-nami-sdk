import React from "react";

import type { TVideoComponent } from "react-nami";
import styled, { css } from "styled-components";

import { transition } from "./css";

type VideoProps = { component: TVideoComponent };

const Wrapper = styled.div<VideoProps>`
  pointer-events: none;
  ${transition()}

  ${({
    component: {
      topMargin,
      leftMargin,
      rightMargin,
      bottomMargin,
      imageCropping,
      height,
      width,
    },
  }) => {
    const fit = imageCropping === "fit";
    return css`
      position: relative;
      overflow: hidden;
      height: ${parseSize(height)};
      width: ${parseSize(width)};
      margin: ${topMargin}px ${rightMargin}px ${bottomMargin}px ${leftMargin}px;

      video {
        position: absolute;
        object-fit: ${fit ? "contain" : "cover"};
        object-position: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `;
  }}
`;

export default function Video({ component }: VideoProps) {
  return component.url ? (
    <Wrapper component={component}>
      <video autoPlay loop muted>
        <source src={component.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Wrapper>
  ) : null;
}

function parseSize(value: undefined | string | number): string {
  if (typeof value === "undefined") return "100%";
  return typeof value === "number" ? `${value}px` : value;
}
