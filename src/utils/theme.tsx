import * as React from 'react';
import type { CreateStyledComponent, StyledOptions } from '@emotion/styled';
import type { FilteringStyledOptions } from '@emotion/styled/types/base';
import type { PropsOf } from '@emotion/react';
import {
  ThemeProvider as BaseThemeProvider,
  useTheme as useBaseTheme,
} from '@emotion/react';
import _styled from '@emotion/styled';

export const media = {
  sm: '@media (min-width: 25em)',
  md: '@media (min-width: 40em)',
  lg: '@media (min-width: 75em)',
} as const;

export type MediaType = keyof typeof media;
export type MediaSelector = typeof media[MediaType];

interface CreateStyled<Theme> {
  <
    C extends React.ComponentType<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<C> = keyof React.ComponentProps<C>
    >(
    component: C,
    options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>,
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & {
      theme?: Theme;
      as?: React.ElementType;
    }
  >;

  <C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<React.ComponentProps<C>>,
  ): CreateStyledComponent<
    PropsOf<C> & {
      theme?: Theme;
      as?: React.ElementType;
    }
  >;

  <
    Tag extends keyof JSX.IntrinsicElements,
    ForwardedProps extends keyof JSX.IntrinsicElements[Tag] = keyof JSX.IntrinsicElements[Tag]
    >(
    tag: Tag,
    options: FilteringStyledOptions<JSX.IntrinsicElements[Tag], ForwardedProps>,
  ): CreateStyledComponent<
    { theme?: Theme; as?: React.ElementType },
    Pick<JSX.IntrinsicElements[Tag], ForwardedProps>
  >;

  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledOptions<JSX.IntrinsicElements[Tag]>,
  ): CreateStyledComponent<
    { theme?: Theme; as?: React.ElementType },
    JSX.IntrinsicElements[Tag]
  >;
}

export type StyledTags<Theme> = {
  [Tag in keyof JSX.IntrinsicElements]: CreateStyledComponent<
    {
      theme?: Theme;
      as?: React.ElementType;
    },
    JSX.IntrinsicElements[Tag]
  >;
};

export function makeTheme<
  BaseTheme extends Record<string, unknown>,
  Theme extends Record<string, unknown>
>(defaultTheme?: Theme) {
  const ThemeProvider: React.FC<{ theme: Partial<BaseTheme> & Theme }> = ({
    theme,
    children,
  }) => {
    const baseTheme = useBaseTheme();
    const mergedTheme = React.useMemo(
      () => ({ ...defaultTheme, ...baseTheme, ...theme }),
      [baseTheme, theme],
    );
    return (
      <BaseThemeProvider theme={mergedTheme}>{children}</BaseThemeProvider>
    );
  };
  const styled = _styled as CreateStyled<BaseTheme & Theme> &
    StyledTags<BaseTheme & Theme>;
  const useTheme = () => useBaseTheme() as BaseTheme & Theme;

  return { styled, ThemeProvider, useTheme };
}
