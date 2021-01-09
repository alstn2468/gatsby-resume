import * as React from 'react';
import { graphql } from 'gatsby';

type L10NContext = {
  language: string,
  messages: GatsbyTypes.TranslationDataFragment,
  t: (key: keyof GatsbyTypes.TranslationDataFragment) => string,
};

export const l10nContext = React.createContext<L10NContext | null>(null);

export const useL10N = () => {
  const l10n = React.useContext(l10nContext);
  if (!l10n) {
    throw new Error('Can not find l10nContext');
  }
  return l10n;
};

export function getTranslationText(
  l10n: {
    language: string,
    messages: GatsbyTypes.TranslationDataFragment,
  },
  key: keyof GatsbyTypes.TranslationDataFragment,
) {
  const message = l10n.messages[key];
  if (process.env.GATSBY_STRICT_L10N === 'true' && !message) {
    throw new Error(
      `Can not find translation resource. lang: ${l10n.language}, key: ${key}`,
    );
  }
  return message ?? '⚠️⚠️⚠️';
}

export function useLanguage() {
  return useL10N().language;
}

export const useTranslation = () => {
  const l10n = useL10N();
  return l10n.t;
};

export const fragments = graphql`
  fragment TranslationData on MessageMessages {
    Fab_exportPdfButton_text
    Fab_changeLanguageButton_text
    Experience_tagCategory_text
  }
  fragment TranslationMessages on Query {
    __translation_messeages: message(language: { eq: $language }) {
      language
      messages {
        ...TranslationData
      }
    }
  }
`;
