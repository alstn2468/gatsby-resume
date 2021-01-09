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

const MEDIA_QUERY_VALUE_REGEXP = /^@media (\(.*\))$/;

const toUseMediaQueryParam = (media: MediaSelector) => ({
  query: media.replace(MEDIA_QUERY_VALUE_REGEXP, '$1'),
});

export function useMediaQuery(media: MediaSelector): boolean {
  return _useMediaQuery(toUseMediaQueryParam(media));
}

export function useMediaValue<T = string>(
  values: readonly [T, T] | readonly [T, T, T] | readonly [T, T, T, T],
) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.media.sm);
  const md = useMediaQuery(theme.media.md);
  const lg = useMediaQuery(theme.media.lg);
  const breaks = [sm, md, lg].filter(Boolean);
  return values[Math.min(breaks.length, values.length - 1)];
}
