
import type { PageProps } from 'gatsby';
import * as React from 'react';
import { graphql } from 'gatsby';
import { Global, css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import {
  getTranslationText,
  l10nContext,
} from '~/src/components/l10nContext'
import { Fab } from '~/src/components';

type LocalizedIndexPageProps = PageProps<
  GatsbyTypes.TemplateIndexPageQuery,
  GatsbyTypes.SitePageContext
>;

const TemplateIndexPage: React.FC<LocalizedIndexPageProps> = ({
  data,
  location,
  pageContext,
}) => {
  if (!data.target) {
    throw new Error('TemplateIndexPage에 data.target 없습니다.');
  }
  const language = data.__translation_messeages?.language
  if (!language) {
    throw new Error('TemplateIndexPage에 language 없습니다.');
  }
  type L10nContext = React.ContextType<typeof l10nContext>;
  const l10n = React.useMemo<L10nContext>(() => {
    if (!data?.__translation_messeages) {
      return null;
    }
    const { messages, language } = data.__translation_messeages;
    if (!(language && messages)) {
      return null;
    }
    return {
      language,
      messages,
      t: key => getTranslationText({ language, messages }, key),
    };
  }, [data]);
  const currentLanguage = l10n?.language;
  return (
    <l10nContext.Provider value={l10n}>
      <div>
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
        {language && <Fab language={language} />}
        {(Object.keys(data.target) as Array<keyof typeof data.target>).map((key) => {
          if (!data.target?.hasOwnProperty(key) || !data.target[key]) {
            throw new Error(`data.target can not has ${key} attribute.`);
          }
          return (
            <section key={key}>
              <h2>Key: {key}</h2>
              <p>Item: {JSON.stringify(data.target[key])}</p>
            </section>
          )
        })}
      </div>
    </l10nContext.Provider>
  );
}

export default TemplateIndexPage;

export const query = graphql`
  query TemplateIndexPage(
    $targetId: String!,
    $language: String!,
  ) {
    ...TranslationMessages
    target(id: { eq: $targetId }) {
      introduce {
        title
        name
        email
        phone
        github
        facebook
        instagram
        linkedIn
        youtube
        description
      }
      skill {
        title
        criteria
        category {
        category
          data {
        name
            level
          }
        }
      }
      experience {
        title
        data {
        title
          startDate
          endDate
          position
          description
          skill
        }
      }
      project {
        title
        data {
        title
          company
          startDate
          endDate
          description {
        title
            detail
          }
        }
      }
      opensource {
        title
        data {
        title
          description
          link
        }
      }
      presentation {
        title
        data {
        title
          description
          link
        }
      }
      paper {
        title
        data {
        title
          description
          link
        }
      }
      education {
        title
        data {
        title
          startDate
          endDate
          major
        }
      }
      etc {
        title
        data {
        title
          startDate
          endDate
          description
        }
      }
    }
  }
`;
