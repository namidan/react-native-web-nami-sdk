import React from 'react';

import * as Icons from '@ant-design/icons';
import type {
  TSymbolComponent,
  TTextComponent,
  TTextLikeComponent,
  TTextListComponent,
} from 'react-nami';
import ReactMarkdown from 'react-markdown';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import {
  applyStyles,
  font,
  justifyContent,
  pickAndApplyBackgroundColor,
  strikethrough,
  transition,
} from './css';
import TemplateComponent from './templateComponent';

function applyLinkColor(
  component: TTextLikeComponent
): FlattenSimpleInterpolation {
  const linkColor = component.linkColor || 'blue';
  return css`
    a:link {
      color: ${linkColor};
      text-decoration-line: underline;
    }
    a:visited {
      color: ${linkColor};
      text-decoration-line: underline;
    }
    a:hover {
      color: ${linkColor};
    }
    a:active {
      color: ${linkColor};
      text-decoration-line: underline;
    }
  `;
}

type ComponentProps<T> = {
  component: T;
  inFocusedState?: boolean;
  groupId: string | null;
};

const TextWrapper = styled.div<{
  component: TTextLikeComponent;
  inFocusedState?: boolean;
  groupId: string | null;
}>`
  display: flex;
  overflow-wrap: anywhere;
  width: 100%;
  ${({ component, inFocusedState }) => css`
    ${pickAndApplyBackgroundColor(component, inFocusedState)}
    color: ${inFocusedState && component.focusedFontColor
    ? component.focusedFontColor
    : component.fontColor};
    font-size: ${component.fontSize ?? 12}px;
    text-align: ${component.alignment || 'center'};
    z-index: ${component.zIndex ?? 'initial'};
    ${strikethrough(component.strikethrough)}
    ${font(component)}
    ${applyStyles(component)}
    ${applyLinkColor(component)}
  `}
`;

const SymbolWrapper = styled.div<{
  component: TTextLikeComponent;
}>`
  display: flex;
  overflow-wrap: anywhere;
  ${transition()};
  ${({ component }) => css`
    margin-right: ${component.rightMargin || component.spacing || 0}px;
    ${pickAndApplyBackgroundColor(component)}
    color: ${component.fontColor};
    font-size: ${component.fontSize ?? 12}px;
  `}
`;

const LegalTextWrapper = styled.div<{ component: TTextLikeComponent }>`
  display: block;
  overflow-wrap: break-word;
  width: 100%;
  ${({ component }) => css`
    ${pickAndApplyBackgroundColor(component)}
    color: ${component.fontColor};
    font-size: ${component.fontSize ?? 12}px;
    text-align: ${component.alignment || 'center'};
    z-index: ${component.zIndex ?? 'initial'};
    ${font(component)}
    ${applyStyles(component)}
    ${applyLinkColor(component)}
  `}
`;

const TextListWrapper = styled.div<{ component: TTextListComponent }>`
  display: flex;
  align-items: center;
  width: 100%;
  ${transition()};

  ${TextWrapper} {
    width: fit-content;
  }

  ${({ component }) => css`
    &:not(:first-child) {
      margin-top: ${component.spacing || 0}px;
    }

    ${justifyContent(component)}
  `}
`;

export function Text({
  component,
  inFocusedState,
  groupId,
}: ComponentProps<TTextComponent>) {
  if (!component.text) return null;
  if (component.textType === 'legal') {
    return (
      <LegalTextWrapper component={component}>
        <ReactMarkdown>{component.text}</ReactMarkdown>
      </LegalTextWrapper>
    );
  }
  return (
    <TextWrapper
      component={component}
      inFocusedState={inFocusedState}
      groupId={groupId}
    >
      <ReactMarkdown>{component.text}</ReactMarkdown>
    </TextWrapper>
  );
}

export function TextList({
  component,
  groupId,
}: ComponentProps<TTextListComponent>) {
  const { fontColor, fontSize, bulletComponent, texts, spacing } = component;
  const bullet = bulletComponent
    ? { fontColor, fontSize, spacing, ...bulletComponent }
    : null;
  return (
    <>
      {texts.map((text, i) =>
        !text ? null : (
          <TextListWrapper key={i} component={component}>
            {bullet && (
              <TemplateComponent component={bullet} groupId={groupId} />
            )}
            <TextWrapper component={component} groupId={groupId}>
              <ReactMarkdown>{text}</ReactMarkdown>
            </TextWrapper>
          </TextListWrapper>
        )
      )}
    </>
  );
}

export function Symbol({ component }: ComponentProps<TSymbolComponent>) {
  const Icon = Icons[component.name] as React.FC | undefined;
  if (typeof Icon === 'undefined') return null;
  return (
    <SymbolWrapper component={component}>
      <Icon />
    </SymbolWrapper>
  );
}
