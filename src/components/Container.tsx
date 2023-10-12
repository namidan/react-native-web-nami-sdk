import type {
  TCarouselContainer,
  TContainer,
  TContainerPosition,
  TProductContainer,
  TFlexProductContainer,
} from "react-nami";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import { applyStyles, flexDirection, pickAndApplyBackgroundColor } from "./css";

const Container = styled.div<{
  component: Omit<
    TContainer | TProductContainer | TFlexProductContainer | TCarouselContainer,
    "name"
  >;
  inFocusedState?: boolean;
}>`
  display: flex;

  ${({ component, inFocusedState }) => {
    const isVertical = component.direction === "vertical";
    const sizeKey = isVertical ? "width" : "height";
    const spaceKey = isVertical ? "margin-top" : "margin-left";
    const background = component.fillImage
      ? css`
          background-image: url(${component.fillImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          height: 100%;
          width: 100%;
        `
      : pickAndApplyBackgroundColor(component, inFocusedState);
    return css`
      ${background};
      ${parsePosition(component.position)}
      ${flexDirection(component)}
      ${applyStyles(component, inFocusedState)}

      > * {
        ${sizeKey}: 100%;

        &:not(:first-child) {
          ${spaceKey}: ${component.spacing || 0}px;

          // TODO: Temp solution;
          @media (max-width: 825px) {
            margin-left: 0px;
          }
          @media (max-width: 510px) {
            padding-left: 6px;
            padding-right: 6px;
          }
        }
      }
    `;
  }}
`;

export default Container;

function parsePosition(
  position?: TContainerPosition
): string | FlattenSimpleInterpolation {
  if (!position) return "";
  const [alignment, spot] = position.split("-");
  return css`
    align-self: ${alignment};
    ${spot}: 0;
  `;
}
