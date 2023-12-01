import type { TSegmentPicker } from 'react-nami';
import styled, { css } from 'styled-components';

import { applyStyles, flexDirection, pickAndApplyBackgroundColor } from './css';

const SegmentPicker = styled.div<{
  component: TSegmentPicker;
}>`
  display: flex;
  ${({ component }) => {
    const isVertical = component.direction === 'vertical';
    const sizeKey = isVertical ? 'width' : 'height';
    const spaceKey = isVertical ? 'margin-top' : 'margin-left';
    const background = pickAndApplyBackgroundColor(component, false);
    return css`
      ${background};
      ${flexDirection(component)}
      ${applyStyles(component, false)}

      > * {
        ${sizeKey}: 100%;

        &:not(:first-child) {
          ${spaceKey}: ${component.spacing || 0}px;
        }
      }
    `;
  }}
`;

export default SegmentPicker;
