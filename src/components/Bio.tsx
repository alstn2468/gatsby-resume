import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { rem } from 'polished';
import Img from 'gatsby-image';
import {
  Container as BaseContainer,
  ListItemData as BaseListItemData,
  ListItemDataTitle,
  Link,
} from '~/src/components/common';
import { styled } from '~/src/components/themeContext';
import SocialMedia from '~/src/components/bio/SocialMedia';
import { FieldError, addAssetPrefix } from '~/src/utils';

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
  flex: '0 0 80%',
  maxWidth: '80%',
  padding: `0 ${rem(16)}`,
  [props.theme.media['md']]: {
    padding: 0,
    flex: '0 0 25%',
    maxWidth: '25%',
  },
}));

const BioList = styled(BaseListItemData)((props) => ({
  marginTop: rem(8),
  padding: `0 ${rem(16)}`,
  paddingBottom: rem(16),
  listStyle: 'none',
  [props.theme.media['md']]: {
    marginTop: 0,
    paddingBottom: 0,
    paddingLeft: rem(32),
  },
}));

const BioItem = styled.li({
  display: 'flex',
  width: '100%',
  fontSize: rem(14),
  ':not(:last-of-type)': {
    paddingBottom: rem(8),
  },
});

const NameText = styled(ListItemDataTitle)((props) => ({
  fontSize: rem(24),
  marginBottom: 0,
  [props.theme.media['md']]: {
    fontSize: rem(24),
    marginBottom: 0,
  },
}));

const Bio: React.FC<BioProps> = ({
  data,
}) => {
  const profileImage = useStaticQuery<GatsbyTypes.ProfileImageQuery>(graphql`
    query ProfileImage {
      image: file(relativePath: { eq: "profile.png" }) {
        childImageSharp {
          fluid {
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
  if (!data.name) {
    throw new FieldError({
      componentName: 'Bio',
      field: 'data.name',
    });
  }
  const prefixImage = {
    ...fluidImage,
    src: addAssetPrefix(fluidImage.src),
    srcWebp: fluidImage?.srcWebp && addAssetPrefix(fluidImage.srcWebp),
    srcSet: addAssetPrefix(fluidImage.srcSet),
    srcSetWebp: fluidImage?.srcSetWebp && addAssetPrefix(fluidImage.srcSetWebp)
  };
  return (
    <Container>
      <ImageWrapper>
        <Img
          style={{ height: '100%' }}
          fluid={prefixImage}
        />
      </ImageWrapper>
      <BioList>
        <BioItem>
          <NameText>{data.name}</NameText>
        </BioItem>
        {data.phone && <BioItem>{data.phone}</BioItem>}
        {data.email && <BioItem>{data.email}</BioItem>}
        {data.github && (
          <BioItem>
            <SocialMedia type="Github" />
            <Link link={`https://github.com/${data.github}`} >
              Github
            </Link>
          </BioItem>
        )}
        {data.facebook && (
          <BioItem>
            <SocialMedia type="Facebook" />
            <Link link={`https://facebook.com/${data.facebook}`} >
              Facebook
            </Link>
          </BioItem>
        )}
        {data.instagram && (
          <BioItem>
            <SocialMedia type="Instagram" />
            <Link link={`https://instagram.com/${data.instagram}`} >
              Instagram
            </Link>
          </BioItem>
        )}
        {data.linkedIn && (
          <BioItem>
            <SocialMedia type="LinkedIn" />
            <Link link={`https://www.linkedin.com/in/${data.linkedIn}`} >
              LinkedIn
            </Link>
          </BioItem>
        )}
        {data.youtube && (
          <BioItem>
            <SocialMedia type="Youtube" />
            <Link link={`https://www.youtube.com/channel/${data.youtube}`} >
              Youtube
            </Link>
          </BioItem>
        )}
      </BioList>
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
