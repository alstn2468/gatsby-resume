import * as React from 'react';
import { Global, css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider, defaultTheme } from '~/src/components/themeContext';
import { l10nContext } from '~/src/components/l10nContext';

type LayoutProps = {
  l10n: React.ContextType<typeof l10nContext>;
};

const Layout: React.FC<LayoutProps> = ({
  l10n,
  children,
}) => {
  const currentLanguage = l10n?.language;
  return (
    <ThemeProvider theme={defaultTheme}>
      <l10nContext.Provider value={l10n}>
        {currentLanguage && (
          <Helmet>
            <html lang={currentLanguage} />
          </Helmet>
        )}
        <Global
          styles={css({
            body: {
              margin: 0,
            },
          })}
        />
        {children}
      </l10nContext.Provider>
    </ThemeProvider>
  );
}

export default Layout;