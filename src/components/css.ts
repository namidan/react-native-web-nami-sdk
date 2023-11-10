import { TBaseComponent, BorderMap, TTextLikeComponent } from "react-nami";
import { css, FlattenSimpleInterpolation } from "styled-components";

const ALIGNMENT_MAP: { [key: string]: string } = {
  top: "start",
  left: "start",
  right: "end",
  bottom: "end",
  center: "center",
};

export function applyStyles(
  component: TBaseComponent,
  inFocusedState?: boolean
): FlattenSimpleInterpolation {
  return css`
    ${transition()}
    ${grow(component)}
    ${paddingAndMargin(component)}
    ${transform(component)}
    ${borders(component, inFocusedState)}
    ${alignItems(component)}
    ${justifyContent(component)}
    ${widthAndHeight(component)}
    ${dropShadow(component)}
  `;
}

export function flexDirection({ direction }: TBaseComponent): string {
  return `flex-direction: ${direction === "vertical" ? "column" : "row"};`;
}

export function grow({ grow }: TBaseComponent): string {
  return grow ? "flex-grow: 1;" : "";
}

export function transform({
  moveX = 0,
  moveY = 0,
}: TBaseComponent): FlattenSimpleInterpolation | string {
  return css`
    transform: translate(
      ${typeof moveX === "number" ? `${moveX}px` : moveX},
      ${typeof moveY === "number" ? `${moveY}px` : moveY}
    );
  `;
}

export function transition(): FlattenSimpleInterpolation {
  return css`
    transition: all 0.3s;
  `;
}

export function paddingAndMargin(
  component: TBaseComponent
): FlattenSimpleInterpolation {
  return css`
    padding-right: ${component.rightPadding ?? 0}px;
    padding-left: ${component.leftPadding ?? 0}px;
    padding-top: ${component.topPadding ?? 0}px;
    padding-bottom: ${component.bottomPadding ?? 0}px;
    margin-right: ${component.rightMargin ?? 0}px;
    margin-left: ${component.leftMargin ?? 0}px;
    margin-top: ${component.topMargin ?? 0}px;
    margin-bottom: ${component.bottomMargin ?? 0}px;
  `;
}

export function borders(
  component: TBaseComponent,
  inFocusedState?: boolean
): FlattenSimpleInterpolation {
  const color =
    inFocusedState && component.focusedBorderColor
      ? component.focusedBorderColor
      : component.borderColor;
  const radius =
    inFocusedState && component.focusedBorderRadius
      ? component.focusedBorderRadius
      : component.borderRadius ?? 0;
  const roundBorders = component.roundBorders || [];
  const borders = roundBorders.length
    ? roundBorders
        .map((border) => `${BorderMap[border]}: ${radius}px;`)
        .join("\n")
    : `border-radius: ${radius}px;`;
  const borderWidth =
    inFocusedState && component.focusedBorderWidth
      ? component.focusedBorderWidth
      : component.borderWidth || 0;
  return css`
    border-color: ${color ? `${color} !important` : "transparent"};
    border-width: ${borderWidth}px !important;
    border-style: solid;
    ${borders}
  `;
}

export function alignItems({
  alignment,
}: TBaseComponent): FlattenSimpleInterpolation | string {
  return css`
    align-items: ${(alignment && ALIGNMENT_MAP[alignment]) || "center"};
  `;
}

export function justifyContent({
  alignment,
}: TBaseComponent): FlattenSimpleInterpolation | string {
  return css`
    justify-content: ${(alignment && ALIGNMENT_MAP[alignment]) || "center"};
  `;
}

export function font({ fontName }: TTextLikeComponent): string {
  const [font] = (fontName || "").split("-");
  return `font-family: '${fontName}', '${font}', 'Helvetica';`;
}

export function widthAndHeight(
  component: TBaseComponent
): FlattenSimpleInterpolation {
  const width = component.width || component.fixedWidth;
  const height = component.height || component.fixedHeight;
  return css`
    max-width: 100%;
    ${typeof width !== "undefined" ? `width: ${parseSize(width)};` : ""}
    ${typeof height !== "undefined" ? `height: ${parseSize(height)};` : ""}
  `;
}

export function dropShadow(
  component: TBaseComponent
): FlattenSimpleInterpolation {
  if (!component.dropShadow) return css``;
  const regex = new RegExp(
    "([0-9]+)\\s([0-9]+)\\s([0-9]+)\\s(rgba?\\([0-9\\s\\/.]+\\))",
    "gi"
  );
  const dropShadowMatch = regex.exec(component.dropShadow);
  if (!dropShadowMatch || dropShadowMatch.length !== 5) return css``;
  return css`
    box-shadow: ${dropShadowMatch[1]}px ${dropShadowMatch[2]}px
      ${dropShadowMatch[3]}px ${dropShadowMatch[4]};
  `;
}

function parseSize(value: string | number): string {
  let output;
  if (typeof value === "number") {
    output = `${value}px`;
  } else {
    output = value === "fitContent" ? "fit-content" : value;
  }
  return `${output} !important`; // This is because of Container's children size
}

export function pickAndApplyBackgroundColor(
  component: TBaseComponent,
  inFocusedState?: boolean
): string {
  if (inFocusedState && component.focusedFillColor)
    return backgroundColor(component.focusedFillColor);
  return backgroundColor(component.fillColor || "transparent");
}

export function backgroundColor(value: string): string {
  return value.includes("gradient")
    ? `background-image: ${value};`
    : `background-color: ${value};`;
}

export function backgroundImage(value: string | null): string {
  return value == null ? "" : `background-image: url(${value});`;
}

export function strikethrough(
  value: boolean | undefined
): FlattenSimpleInterpolation {
  if (!value) return css``;
  return css`
    text-decoration: line-through;
    text-decoration-thickness: auto;
  `;
}
