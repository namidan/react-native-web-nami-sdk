export type TFont = {
  id: string;
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

  // eslint-disable-next-line promise/valid-params,promise/prefer-await-to-then
  return document.fonts.ready.then();
}

export function buildFontFaceFamily(font: TFont): string {
  return sanitizeFontName(`${font.family}-${font.style}`);
}

export function sanitizeFontName(value: string): string {
  return value.replace(/ /g, "");
}
