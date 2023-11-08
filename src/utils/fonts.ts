export type TFont = {
  family: string;
  style: string;
  file: string;
};
export function loadFonts(fonts: TFont[]): Promise<FontFaceSet> {
  const existingFonts = new Set(
    Array.from(document.fonts.values()).map(
      (fontFace) => (fontFace as FontFace).family
    )
  );
  fonts.forEach((font) => {
    const name = buildFontFaceFamily(font);
    if (existingFonts.has(name)) return;
    const fontFace = new FontFace(name, `url(${font.file})`);
    document.fonts.add(fontFace);
  });
  return document.fonts.ready.then();
}

// This function converts the fonts object to an array and then calls loadFonts
export function prepareAndLoadFonts(fontsObject: {
  [key: string]: any;
}): Promise<FontFaceSet> {
  const fontsArray: TFont[] = Object.values(fontsObject).map((font) => ({
    family: font.family,
    style: font.style,
    file: font.file,
  }));

  return loadFonts(fontsArray);
}

export function buildFontFaceFamily(font: TFont): string {
  return sanitizeFontName(`${font.family}-${font.style}`);
}

export function sanitizeFontName(value: string): string {
  return value.replace(/ /g, "");
}
