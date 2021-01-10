import type { MediaSelector } from '~/src/utils';
import { useMediaQuery as _useMediaQuery } from 'react-responsive';
import { makeTheme, media } from '~/src/utils';

export type Theme = {
  media: typeof media,
};

export const defaultTheme: Theme = Object.freeze({
  media,
});

export const { styled, ThemeProvider, useTheme } = makeTheme<
  Record<string, unknown>,
  Theme
>(defaultTheme);
