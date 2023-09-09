import type { TSpacerComponent } from "react-nami";
import styled, { css } from "styled-components";

import { applyStyles } from "./css";

const Spacer = styled.div<{ component: TSpacerComponent }>`
  ${({ component }) => {
    const hasWidthOrHeight =
      component.height ||
      component.fixedHeight ||
      component.width ||
      component.fixedWidth;
    return css`
      ${hasWidthOrHeight ? "" : "flex-grow: 1;"}
      ${applyStyles(component)}
    `;
  }}
`;

export default Spacer;
