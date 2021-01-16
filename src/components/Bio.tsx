import * as React from 'react';
import { graphql, useStaticQuery, withAssetPrefix } from 'gatsby';
import { rem } from 'polished';
import Img from 'gatsby-image';
import {
  Container as BaseContainer,
  ListItemData as BaseListItemData,
} from '~/src/components/common';
import { styled } from '~/src/components/themeContext';
import { FieldError } from '~/src/utils';

type BioProps = {
  data: GatsbyTypes.BioDataFragment,
};

const Container = styled(BaseContainer)({
  display: 'flex',
  flexWrap: 'wrap',
  paddingBottom: rem(16),
});

const ImageWrapper = styled.div((props) => ({
  margin: 0,
  flex: '0 0 50%',
  maxWidth: '50%',
  padding: `0 ${rem(16)}`,
  [props.theme.media['md']]: {
    padding: 0,
    flex: '0 0 25%',
    maxWidth: '25%',
  },
}));

const ListItemData = styled(BaseListItemData)((props) => ({
  marginTop: rem(8),
  padding: `0 ${rem(16)}`,
  paddingBottom: rem(16),
  [props.theme.media['md']]: {
    marginTop: 0,
    paddingBottom: 0,
  },
}));

const Bio: React.FC<BioProps> = ({
  data,
}) => {
  const profileImage = useStaticQuery<GatsbyTypes.ProfileImageQuery>(graphql`
    query ProfileImage {
      image: file(relativePath: { eq: "profile.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  const fluidImage = profileImage?.image?.childImageSharp?.fluid;
  if (!fluidImage) {
    throw new FieldError({
      componentName: 'Bio',
      field: 'fluidImage',
    });
  }
  const prefixImage = {
    ...fluidImage,
    src: withAssetPrefix(fluidImage.src),
    srcWebp: fluidImage?.srcWebp && withAssetPrefix(fluidImage.srcWebp),
    srcSet: fluidImage.srcSet
      .split('\n')
      .map(withAssetPrefix)
      .join('\n'),
    srcSetWebp: fluidImage?.srcSetWebp
      && fluidImage.srcSetWebp
        .split('\n')
        .map(withAssetPrefix)
        .join('\n'),
  };
  return (
    <Container>
      <ImageWrapper>
        <Img fluid={prefixImage} />
      </ImageWrapper>
      <ListItemData>
        {data.name}
      </ListItemData>
    </Container>
  );
}

export default Bio;

export const query = graphql`
  fragment BioData on Introduce {
    name
    email
    phone
    github
    facebook
    instagram
    linkedIn
    youtube
  }
`;
