
import type { PageProps } from 'gatsby';
import * as React from 'react';
import { graphql, Link } from 'gatsby';
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
  return (
    <div>
      {data.target?.language && <Fab language={data.target.language} />}
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
  );
}

export default TemplateIndexPage;

export const query = graphql`
        query TemplateIndexPage(
          $targetId: String!,
  ) {
        target(id: { eq: $targetId }) {
        language
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
