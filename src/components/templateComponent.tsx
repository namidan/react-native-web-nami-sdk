import React, { useContext, useMemo } from "react";

import type { TComponent, TConditionalComponent } from "react-nami";

// import CarouselContainer from "./components/CarouselContainer";
// import Container from "./components/Container";
// import Image from "./components/Image";
// import ProductContainer from "./components/ProductContainer";
// import SegmentPicker from "./components/SegmentPicker";
// import { SegmentPickerItem } from "./components/SegmentPickerItem";
// import Stack from "./components/Stack";
// import SvgImage from "./components/SvgImage";
// import { Symbol, Text, TextList } from "./components/Texts";
// import { ComponentContext, FeaturedContext } from "./contexts";
import Button from "./button.component";
import Container from "./Container";
import Image from "./Image";
import ProductContainer from "./ProductContainer";
import Spacer from "./spacer.component";
import { Text, Symbol, TextList } from "./text.component";
import { ComponentContext, FeaturedContext } from "../contexts/context";
import {
  conditionComponentMatches,
  interpolate,
  withOverrides,
} from "../utils/allUtils";

type ComponentProps<T> = {
  component: T;
  inFocusedState?: boolean;
  groupId: string | null;
};
type ComponentFC = React.FC<{
  component: any;
  inFocusedState?: boolean;
  groupId: string | null;
}>;
type ComponentsMapType = { [key: string]: ComponentFC };

const COMPONENTS_MAP: ComponentsMapType = {
  spacer: Spacer,
  symbol: Symbol,
  button: Button,
  text: Text,
  // stack: Stack,
  "text-list": TextList,
  container: Container,
  productContainer: ProductContainer,
  // carouselContainer: CarouselContainer,
  image: Image,
  // videoUrl: Image,
  // svgImage: SvgImage,
  // segmentPicker: SegmentPicker,
  // segmentPickerItem: SegmentPickerItem,
};

export default function TemplateComponent({
  component,
  inFocusedState,
  groupId,
}: ComponentProps<TComponent | TConditionalComponent>) {
  // console.log(component, "ON_START");
  const featured = useContext(FeaturedContext);
  const upperContext = useContext(ComponentContext);

  const context = useMemo(() => {
    if (!component.flag && !component.context) return upperContext;
    const output = component.context
      ? component.context
      : { flag: component.flag };
    return { ...(upperContext || {}), ...output };
  }, [component.flag, component.context, upperContext]);
  // console.log(context, "CONTEXT");

  if (component.component === "condition" || !!component.conditionAttributes) {
    component = interpolate(component, { sku: { featured }, context });
    // console.log("component after check on condition:", component);
  }

  if (component.component === "condition") {
    // console.log(component.components, "condition component");
    // console.log(conditionComponentMatches(component), "condition check");
    if (!conditionComponentMatches(component)) return null;
    const children = component.components?.map(
      (child: any, i: React.Key | null | undefined) => (
        <TemplateComponent
          key={i}
          component={child}
          inFocusedState={inFocusedState}
          groupId={groupId}
        />
      )
    );
    return <>{children}</>;
  }

  if (!(component?.component in COMPONENTS_MAP)) {
    return null;
  }

  component = withOverrides(component);
  const Component = COMPONENTS_MAP[component?.component];
  const components = "components" in component ? component.components : [];
  const children = components.map(
    (child: any, i: React.Key | null | undefined) => (
      <TemplateComponent
        key={i}
        component={child}
        inFocusedState={inFocusedState}
        groupId={groupId}
      />
    )
  );

  const output = (
    // @ts-ignore
    <Component
      component={component}
      inFocusedState={inFocusedState}
      groupId={groupId}
    >
      {children}
    </Component>
  );
  if (!context) return output;
  return (
    <ComponentContext.Provider value={context}>
      {output}
    </ComponentContext.Provider>
  );
}
