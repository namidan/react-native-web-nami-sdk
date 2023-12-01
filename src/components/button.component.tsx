import React, { useState } from 'react';

import type { TButtonContainer } from 'react-nami';
import styled, { css } from 'styled-components';

import { applyStyles, flexDirection, pickAndApplyBackgroundColor } from './css';
import TemplateComponent from './templateComponent';

// Update StyledButton to accept an isPressed prop
const ButtonWrapper = styled.button<{
  component: TButtonContainer;
  inFocusedState?: boolean;
  isPressed?: boolean;
}>`
  ${({ component, inFocusedState, isPressed }) => css`
    ${pickAndApplyBackgroundColor(component, inFocusedState)}
    ${flexDirection(component)}
    ${applyStyles(component, inFocusedState)}
    ${isPressed ? 'opacity: 0.8;' : 'opacity: 1;'}
  `}
`;

interface ButtonProps {
  component: TButtonContainer;
  inFocusedState?: boolean;
  groupId: string | null;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  component,
  inFocusedState,
  groupId,
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    if (onClick) {
      onClick();
    }
  };

  return (
    <ButtonWrapper
      component={component}
      isPressed={isPressed}
      inFocusedState={inFocusedState}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {component.components.map((component, index) => {
        return (
          <TemplateComponent
            key={index}
            inFocusedState={inFocusedState}
            component={component}
            groupId={groupId}
          />
        );
      })}
    </ButtonWrapper>
  );
};

export default Button;
