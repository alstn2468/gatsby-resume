import type { PageProps } from 'gatsby';
import * as React from 'react';
import { graphql, navigate } from 'gatsby';

import { parseLink, linkToString } from '~/src/utils';

type IndexPageProps = PageProps<GatsbyTypes.IndexPageQuery>;

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  React.useEffect(() => {
    const availableLanguages = data.allTarget.nodes.map(node => node.language);
    const [navigatorLanguage] = window.navigator.language.split('-');
    const targetLanguage = availableLanguages.find(lang => {
      if (lang) {
        return lang.startsWith(navigatorLanguage);
      }
      return 'en';
    });

    const current = new URL(window.location.href);
    current.pathname = `/${targetLanguage}/`;

    const replaceTo = parseLink(current.href, window.location.origin);
    void navigate(linkToString(replaceTo), { replace: true });
  }, [data]);

  return null;
};

export default IndexPage;

export const query = graphql`
  query IndexPage {
    allTarget {
      nodes {
        language
      }
    }
  }
`;
