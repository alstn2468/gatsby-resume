
import type { PageProps } from 'gatsby';
import * as React from 'react';
import { graphql } from 'gatsby';

type LocalizedIndexPageProps = PageProps<
  GatsbyTypes.TemplateIndexPageQuery,
  GatsbyTypes.SitePageContext
>;

const TemplateIndexPage: React.FC<LocalizedIndexPageProps> = ({
  data,
  location,
  pageContext,
}) => {
  if (!data.target?.language) {
    throw new Error('TemplateIndexPage에 data.target.language가 없습니다.');
  }
  return (
    <div>{data.target.language} Hello World!</div>
  );
}

export default TemplateIndexPage;

export const query = graphql`
  query TemplateIndexPage(
    $targetId: String!,
  ) {
    target(id: { eq: $targetId }) {
      language
    }
  }
`;
