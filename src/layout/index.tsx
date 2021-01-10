import * as React from 'react';
import { Global, css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { ThemeProvider, defaultTheme } from '~/src/components/themeContext';
import { l10nContext } from '~/src/components/l10nContext';
import { useSiteMetadata } from '~/src/utils';
import NotoSansKrFont from '~/src/components/NotoSansKrFont';

type LayoutProps = {
  l10n: React.ContextType<typeof l10nContext>,
};

const Layout: React.FC<LayoutProps> = ({
  l10n,
  children,
}) => {
  const siteMetadata = useSiteMetadata();
  const currentLanguage = l10n?.language;
  const pathPrefix = process.env?.GATSBY_PATH_PREFIX ?? '';
  return (
    <ThemeProvider theme={defaultTheme}>
      <l10nContext.Provider value={l10n}>
        {currentLanguage && (
          <>
            <Helmet>
              <html lang={currentLanguage} />
            </Helmet>
            <GatsbySeo
              title={'Gatsby Resume'}
              description={'Static website resume with GatsbyJS, TypeScript'}
              canonical={siteMetadata.siteUrl + `${pathPrefix}/${currentLanguage}`}
              openGraph={{
                type: 'website',
                url: siteMetadata.siteUrl + `${pathPrefix}/${currentLanguage}`,
                title: 'Gatsby Resume',
                description: 'Static website resume with GatsbyJS, TypeScript',
                images: [
                  {
                    url: `${siteMetadata.siteUrl}/${pathPrefix}/og.jpeg`,
                    width: 1200,
                    height: 630,
                    alt: 'Gatsby Resume',
                  }
                ],
                site_name: 'Gatsby Resume',
              }}
            />
          </>
        )}
        <Global
          styles={css({
            '*': {
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            },
            'body': {
              margin: 0,
              fontWeight: 400,
              textRendering: 'optimizeLegibility',
              wordBreak: 'break-word',
              fontFamily: '"Noto Sans KR__subset", "Noto Sans KR", sans-serif',
              WebkitFontSmoothing: 'antialiased',
            },
            'body:lang(ko)': {
              wordBreak: 'keep-all',
            },
          })}
        />
        <NotoSansKrFont />
        {children}
      </l10nContext.Provider>
    </ThemeProvider>
  );
}

export default Layout;