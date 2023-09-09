import React from "react";

import type { TImageComponent } from "react-nami";
import styled, { css } from "styled-components";

import { transition } from "./css";

type ImageProps = { component: TImageComponent };

const Wrapper = styled.div<ImageProps>`
  pointer-events: none;
  ${transition()}

  ${({
    component: {
      alignment,
      imageCropping,
      height,
      width,
      url,
      spacing,
      rightMargin,
    },
  }) => {
    const fit = imageCropping === "fit";
    return css`
      background-image: url(${url});
      background-size: ${fit ? "contain" : "cover"};
      background-position: ${alignment} center;
      background-repeat: no-repeat;
      height: ${parseSize(height)};
      width: ${parseSize(width)};
      margin-right: ${rightMargin || spacing || 0}px;
    `;
  }}
`;

export default function Image({ component }: ImageProps) {
  console.log(component, "image component");
  return component.url ? <Wrapper component={component} /> : null;
}

function parseSize(value: undefined | string | number): string {
  if (typeof value === "undefined") return "100%";
  return typeof value === "number" ? `${value}px` : value;
}
