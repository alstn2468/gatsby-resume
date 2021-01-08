import type { PageProps } from 'gatsby';
import * as React from 'react';
import { rem } from 'polished';
import { graphql } from 'gatsby';

import Layout from '~/src/layout';
import Fab from '~/src/components/Fab';
import Etc from '~/src/components/Etc';
import Paper from '~/src/components/Paper';
import Skill from '~/src/components/Skill';
import Project from '~/src/components/Project';
import Education from '~/src/components/Education';
import Introduce from '~/src/components/Introduce';
import Experience from '~/src/components/Experience';
import OpenSource from '~/src/components/OpenSource';
import Presentation from '~/src/components/Presentation';
import { styled } from '~/src/components/themeContext';
import { l10nContext, getTranslationText } from '~/src/components/l10nContext';

type LocalizedIndexPageProps = PageProps<
  GatsbyTypes.TemplateIndexPageQuery,
  GatsbyTypes.SitePageContext
>;

const Container = styled.div((props) => ({
  maxWidth: rem(540),
  margin: '0 auto',
  padding: `0 ${rem(16)}`,
  [props.theme.media['md']]: {
    maxWidth: rem(960),
  },
}));

const TemplateIndexPage: React.FC<LocalizedIndexPageProps> = ({
  data,
}) => {
  const { target, __translation_messeages } = data;
  if (!target) {
    throw new Error('No target on TemplateIndexPage.');
  }
  const language = __translation_messeages?.language;
  if (!language) {
    throw new Error('No language on TemplateIndexPage.');
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
  type TargetKeyType = Array<keyof typeof target>;
  return (
    <Layout l10n={l10n}>
      <Container>
        {language && <Fab language={language} />}
        {(Object.keys(target) as TargetKeyType).map((key, idx) => {
          switch (key) {
            case 'introduce':
              return <Introduce key={key + idx} data={target[key]} />;
            case 'skill':
              return <Skill key={key + idx} data={target[key]} />;
            case 'experience':
              return <Experience key={key + idx} data={target[key]} />;
            case 'project':
              return <Project key={key + idx} data={target[key]} />;
            case 'opensource':
              return <OpenSource key={key + idx} data={target[key]} />;
            case 'presentation':
              return <Presentation key={key + idx} data={target[key]} />;
            case 'paper':
              return <Paper key={key + idx} data={target[key]} />;
            case 'education':
              return <Education key={key + idx} data={target[key]} />;
            case 'etc':
              return <Etc key={key + idx} data={target[key]} />
          }
        })}
      </Container>
    </Layout>
  );
};

export default TemplateIndexPage;

export const query = graphql`
  query TemplateIndexPage($targetId: String!, $language: String!) {
    ...TranslationMessages
    target(id: { eq: $targetId }) {
      introduce {
        ...IntroduceData
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
        ...OpenSourceData
      }
      presentation {
        ...PresentationData
      }
      paper {
        ...PaperData
      }
      education {
        ...EducationData
      }
      etc {
        ...EtcData
      }
    }
  }
`;
