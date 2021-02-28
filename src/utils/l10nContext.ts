import * as React from 'react';
import { graphql } from 'gatsby';

type L10NContext = {
  language: string;
  messages: GatsbyTypes.TranslationMessages_allMessagesFragment;
  t: (key: keyof GatsbyTypes.TranslationMessages_allMessagesFragment) => string;
};

export const l10nContext = React.createContext<L10NContext | null>(null);

export const useL10N = () => {
  const l10n = React.useContext(l10nContext);
  if (!l10n) {
    throw new Error(
      '지역화 리소스를 찾을 수 없습니다.\n\n' +
        '작업 중인 페이지에 다음과 같이 페이지 쿼리를 추가하세요.\n' +
        'const query = graphql`\n' +
        '    query MyPage($translationId: String!) {\n' +
        '        ...TranslationMessages\n' +
        '    }\n' +
        '`',
    );
  }
  return l10n;
};

export function getTranslationText(
  l10n: {
    language: string;
    messages: GatsbyTypes.TranslationMessages_allMessagesFragment;
  },
  key: keyof GatsbyTypes.TranslationMessages_allMessagesFragment,
) {
  const message = l10n.messages[key];
  if (process.env.STRICT_L10N === 'true' && !message?.text) {
    throw new Error(
      `번역 리소스를 찾을 수 없습니다. lang: ${l10n.language}, key: ${key}`,
    );
  }
  return message?.text ?? '⚠️⚠️⚠️';
}

export function useLanguage() {
  return useL10N().language;
}

export const useTranslation = () => {
  const l10n = useL10N();
  return l10n.t;
};

export const fragments = graphql`
  fragment TranslationMessages on Query {
    __translation_messeages: translationMessages(language: { eq: $language }) {
      language
      messages {
        ...TranslationMessages_allMessages
      }
    }
  }
`;
