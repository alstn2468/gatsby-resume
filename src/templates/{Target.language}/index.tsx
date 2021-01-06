import type { PageProps } from 'gatsby';
import * as React from 'react';
import { graphql } from 'gatsby';
import { Global, css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import Fab from '~/src/components/Fab';
import Skill from '~/src/components/Skill';
import Project from '~/src/components/Project';
import Introduce from '~/src/components/Introduce';
import Experience from '~/src/components/Experience';
import { ThemeProvider, defaultTheme } from '~/src/components/themeContext';
import { l10nContext, getTranslationText } from '~/src/components/l10nContext';

type LocalizedIndexPageProps = PageProps<
  GatsbyTypes.TemplateIndexPageQuery,
  GatsbyTypes.SitePageContext
>;

const TemplateIndexPage: React.FC<LocalizedIndexPageProps> = ({ data }) => {
  const { target, __translation_messeages } = data;
  if (!target) {
    throw new Error('TemplateIndexPage에 target 없습니다.');
  }
  const language = __translation_messeages?.language;
  if (!language) {
    throw new Error('TemplateIndexPage에 language 없습니다.');
  }
  type L10nContext = React.ContextType<typeof l10nContext>;
  const l10n = React.useMemo<L10nContext>(() => {
    if (!__translation_messeages) {
      return null;
    }
    const { messages, language } = __translation_messeages;
    if (!(language && messages)) {
      return null;
    }
    return {
      language,
      messages,
      t: key => getTranslationText({ language, messages }, key),
    };
  }, [__translation_messeages]);
  const currentLanguage = l10n?.language;
  type TargetKeyType = Array<keyof typeof target>;
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
        {language && <Fab language={language} />}
        {(Object.keys(target) as TargetKeyType).map((key, idx) => {
          // FIX ME: HoC 형태로 변경 필요
          switch (key) {
            case 'introduce':
              return <Introduce key={key + idx} data={target[key]} />;
            case 'skill':
              return <Skill key={key + idx} data={target[key]} />;
            case 'experience':
              return <Experience key={key + idx} data={target[key]} />;
            case 'project':
              return <Project key={key + idx} data={target[key]} />;
          }
        })}
      </l10nContext.Provider>
    </ThemeProvider>
  );
};

export default TemplateIndexPage;

export const query = graphql`
  query TemplateIndexPage($targetId: String!, $language: String!) {
    ...TranslationMessages
    target(id: { eq: $targetId }) {
      introduce {
        ...IntroduceDescription
      }
      skill {
        ...SkillData
      }
      experience {
        ...ExperienceData
      }
      project {
        ...ProjectData
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
