import React from "react";

import { BorderMap, TSegmentPickerItem } from "react-nami";
import styled, { FlattenSimpleInterpolation, css } from "styled-components";

import {
  alignItems,
  backgroundColor,
  justifyContent,
  paddingAndMargin,
  transition,
  widthAndHeight,
} from "./css";

type ComponentProps<T> = { component: T; groupId: string | null };

const SegmentPickerItemWrapper = styled.div<{
  component: TSegmentPickerItem;
  groupId: string | null;
}>`
  display: flex;
  overflow-wrap: anywhere;
  width: 100%;
  ${({ component, groupId }) => css`
    ${applyStyles(component, groupId)};
  `}
`;

export function SegmentPickerItem({
  component,
  groupId,
}: ComponentProps<TSegmentPickerItem>) {
  if (!component.text) return null;

  return (
    <SegmentPickerItemWrapper component={component} groupId={groupId}>
      {component.text}
    </SegmentPickerItemWrapper>
  );
}

function applyStyles(
  component: TSegmentPickerItem,
  groupId: string | null
): FlattenSimpleInterpolation {
  const isActive = groupId === component.id;
  const fillColor = isActive
    ? component.activeFillColor || "transparent"
    : "transparent";
  const borderColor = isActive
    ? component.activeBorderColor || "transparent"
    : component.inactiveBorderColor || "transparent";
  const roundBorders =
    (isActive
      ? component.activeRoundBorders
      : component.inactiveRoundBorders) || [];
  const borderRadius = isActive
    ? component.activeBorderRadius || 0
    : component.inactiveBorderRadius || 0;
  const borders = roundBorders.length
    ? roundBorders
        .map((border) => `${BorderMap[border]}: ${borderRadius}px;`)
        .join("\n")
    : `border-radius: ${borderRadius}px;`;
  const fontColor = isActive
    ? component.activeFontColor || "#000000"
    : component.inactiveFontColor || "#000000";
  const fontSize = isActive
    ? component.activeFontSize || 12
    : component.inactiveFontSize || 12;
  const fontName = isActive
    ? component.activeFontName
    : component.inactiveFontName;
  const [font] = (fontName || "").split("-");

  return css`
    ${transition()}
    ${paddingAndMargin(component)};
    ${alignItems(component)};
    ${widthAndHeight(component)};
    ${justifyContent(component)};
    ${backgroundColor(fillColor)};
    border-color: ${borderColor} !important;
    border-width: ${isActive
      ? component.activeBorderWidth || 0
      : component.inactiveBorderWidth || 0}px !important;
    border-style: solid;
    ${borders};
    color: ${fontColor} !important;
    font-size: ${fontSize}px;
    font-family: "${fontName}", "${font}", "Helvetica";
    text-align: ${component.alignment || "center"};
  `;
}
