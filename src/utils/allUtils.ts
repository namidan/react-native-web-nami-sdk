import type {
  TBaseComponent,
  TConditionalComponent,
  TPaywallMedia,
  TTestObject,
} from "react-nami";

type ReplacementsType<T = any> = {
  [type: string]: T extends Array<any> ? never : T;
};

const VAR_REGEX = /\$\{\s*(\w+(\.[a-zA-Z\d_:${}-]{0,99})*?)\s*}/g;

// ------------------- //
// Attributes handlers //
// ------------------- //
export function getAttr(object: any, ...attrs: Array<string | number>): any {
  let current = object;
  for (const attr of attrs) {
    if (current === undefined || current === null) return undefined;
    current = Array.isArray(current) ? current[+attr] : current[attr];
  }
  return current;
}

// ---------------------- //
// Interpolation handlers //
// ---------------------- //
export function interpolate<T extends any>(
  value: T,
  replacements: ReplacementsType
): T {
  if (Array.isArray(value)) {
    return value.reduce((output, item) => {
      const newValue = interpolate(item, replacements);
      return Array.isArray(newValue)
        ? [...output, ...newValue]
        : [...output, newValue];
    }, []) as T;
  }
  if (value === null || value === undefined) return value;
  if (typeof value === "object") {
    return Object.entries(value as { [key: string]: any }).reduce(
      (output, [key, value]) => {
        const parsedValue =
          key === "newRow" ? value : interpolate(value, replacements);
        return { ...output, [key]: parsedValue };
      },
      {}
    ) as T;
  }
  if (typeof value === "string") return interpolateString(value, replacements);
  return value;
}

export function interpolateString(
  value: string,
  replacements: ReplacementsType
): any {
  let output = value;
  for (const [match, rawPath] of Array.from(value.matchAll(VAR_REGEX))) {
    const path = interpolateString(rawPath, replacements);
    // If the variable is the whole string, return the raw value (e.g. number)
    if (match === value) return replacer(match, path);
    // Otherwise, replace it within the string
    if (path !== rawPath) {
      output = output.replace(rawPath, path);
    }
    output = output.replace(VAR_REGEX, replacer);
  }
  return output;

  function replacer(match: string, path: string): string {
    const newValue = getAttr(replacements, ...path.split("."));
    if (newValue === undefined) return match;
    if (typeof newValue !== "string") return newValue;
    return interpolateString(newValue, replacements);
  }
}

// -------------------//
// Condition handlers //
// -------------------//
export function testObjectMatches({
  value,
  expected,
  operator,
}: TTestObject): boolean {
  const variableRegex = /\${[A-Za-z.]+}/g;
  if (operator === "equals") return value === expected;
  if (operator === "notEquals") return value !== expected;
  if (operator === "contains") return value.includes(expected);
  if (operator === "set") return !!value && !value.match(variableRegex);
  if (operator === "notSet") return !value || value.match(variableRegex);
  return false;
}

export function conditionComponentMatches(
  condition: TConditionalComponent
): boolean {
  const tests = condition.assertions || [];
  if (tests.length === 0) return false;
  return tests.every(testObjectMatches);
}

export function withOverrides<T extends TBaseComponent>({
  conditionAttributes,
  ...component
}: T): T {
  if (!conditionAttributes) return component as T;
  return conditionAttributes.reduce((component, condition): T => {
    if (!conditionComponentMatches(condition)) return component;
    return { ...component, ...condition.attributes };
  }, component as T);
}

type TMediaVarOptions = { convertToUrl?: boolean };

export function buildMediaVariables(
  mediaList: { [mediaName: string]: Pick<TPaywallMedia, "content"> },
  { convertToUrl }: TMediaVarOptions = { convertToUrl: false }
): { [mediaName: string]: string | Blob | null } {
  return Object.entries(mediaList).reduce((output, [name, { content }]) => {
    if (convertToUrl && typeof content !== "string" && !!content) {
      content = URL.createObjectURL(content);
    }
    return { ...output, [name]: content };
  }, {});
}

// export function getSkuButtonComponents(
//   // items: SelectableItemType[],
//   component: TProductContainer,
//   // mediaList: { [mediaName: string]: Pick<TPaywallMedia, "content"> } = {},
//   additionalVariableStates?: {}
// ): [boolean, TComponent[]][] {
//   const base = component.productBaseComponents || component.components || [];
//   const featured = component.productFeaturedComponents || base;
//   return items.map((item) => {
//     const components = item.featured ? featured : base;
//     const variables = {
//       ...item.variables,
//       // ...mocks,
//       ...additionalVariableStates,
//       id: item.sku_id,
//     };
//     const replacements = {
//       sku: variables,
//       media: buildMediaVariables(mediaList, { convertToUrl: true }),
//     };
//     return [
//       item.featured,
//       interpolate(components, interpolate(replacements, replacements)),
//     ];
//   }, []);
// }
