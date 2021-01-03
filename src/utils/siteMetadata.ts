import { graphql, useStaticQuery } from 'gatsby';

export function useSiteMetadata() {
  const data = useStaticQuery<GatsbyTypes.SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  if (!data.site?.siteMetadata) {
    throw new Error('siteMetadata should be exist');
  }

  return data.site.siteMetadata;
}
