// import React, { useMemo } from "react";

// import type { TCarouselContainer } from "react-nami";
// import styled from "styled-components";

// import Container from "./Container";
// import { transition } from "./css";
// import TemplateComponent from "./templateComponent";
// import { interpolate } from "../utils/allUtils";

// type CarouselContainerProps = { component: TCarouselContainer };

// const Wrapper = styled(Container)`
//   ${transition()}
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
//
// const DotWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   bottom: 1rem;
// `;
//
// const Dot = styled.span`
//   cursor: pointer;
//   height: 10px;
//   width: 10px;
//   margin: 0 5px;
//   background-color: ${({ color }) => color};
//   border-radius: 50%;
//   display: inline-block;
//   transition: background-color 0.6s ease;
// `;

// export default function CarouselContainer({
//   component: { loopVariable, loopSource, ...component },
// }: CarouselContainerProps) {
// We need to handle slides
// const slides = ["carouselId"];
//
// // define carouselname without component.id
// const slideId = slides[component.id ?? ""];
// const isValid = Array.isArray(loopSource) && typeof loopVariable === "string";
//
// const slide = useMemo(() => {
//   if (!isValid) return null;
//   return (
//     (slideId && loopSource.find(({ id }) => slideId === id)) ||
//     loopSource[0] ||
//     null
//   );
// }, [isValid, loopSource, slideId]);
//
// const parsedComponents = useMemo(() => {
//   if (!isValid || slide === null) return [];
//   const replacements = { [loopVariable]: slide };
//   return interpolate(component.components, replacements).map(
//     (child: any, i: any) => (
//       <TemplateComponent
//         key={`${component.id}-${i}`}
//         component={child}
//         groupId={null}
//       />
//     )
//   );
// }, [loopVariable, component.components, isValid, slide, component.id]);
//
// if (!isValid) return null;
// const dots = loopSource.map(({ id }) => {
//   const color =
//     slide.id === id
//       ? component.activeIndicatorColor
//       : component.indicatorColor;
//   return <Dot key={id} color={color} />;
// });
// return (
//   <Wrapper component={{ ...component, direction: "vertical" }}>
//     {parsedComponents}
//     <DotWrapper>{dots}</DotWrapper>
//   </Wrapper>
// );
// }
