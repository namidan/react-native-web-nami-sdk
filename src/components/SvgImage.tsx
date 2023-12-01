import React from 'react';

import type { TSvgImageComponent } from 'react-nami';
import { ReactSVG } from 'react-svg';
import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

import { transition } from './css';

type ImageProps = { component: TSvgImageComponent };

function parseSize(value: undefined | string | number): string {
  if (typeof value === 'undefined') return '100%';
  return typeof value === 'number' ? `${value}px` : value;
}

function getSvgCSS(component: TSvgImageComponent): FlattenSimpleInterpolation {
  return css`
    ${transition()};
    display: flex;
    overflow-wrap: anywhere;
    background-position: center;
    background-repeat: no-repeat;
    height: ${parseSize(component.height)};
    width: ${parseSize(component.width)};
    fill: ${component.fillColor};
    margin-right: ${component.spacing || 0}px;
  `;
}

export default function SvgImage({ component }: ImageProps) {
  const Wrapper = styled(ReactSVG)`
    ${getSvgCSS(component)}
  `;

  return component.url ? <Wrapper src={component.url} /> : null;
}
