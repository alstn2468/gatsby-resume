import * as React from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/css';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';
import {
  SectionTitle as BaseSectionTitle,
  Container,
  ListItemData,
  Tag,
} from '~/src/components/common';
import { FieldError } from '~/src/utils';

type IntroduceProp = {
  data: GatsbyTypes.IntroduceDataFragment,
};

const IntroduceWrapper = styled.div((props) => ({
  display: 'flex',
  margin: 0,
  flexDirection: 'column',
  paddingRight: rem(16),
  paddingBottom: rem(16),
  [props.theme.media['md']]: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 0,
  },
}));

const SectionTitle = styled(BaseSectionTitle)((props) => ({
  textAlign: 'right',
  [props.theme.media['md']]: {
    textAlign: 'left',
    flex: '0 0 25%',
    maxWidth: '25%',
  },
}));

const IntroduceData = styled(ListItemData)({
  padding: `0 ${rem(16)}`,
  paddingBottom: rem(16),
}).withComponent('div');

const IntroduceText = styled.pre({
  width: '100%',
  lineHeight: 1.8,
  marginTop: 0,
  marginBottom: rem(16),
  whiteSpace: 'pre-line',
});

const UpdateInfoWrapper = styled.div({
  width: '100%',
  textAlign: 'left',
});

const TagTextLabel = styled.small({
  fontWeight: 400,
  marginRight: rem(6),
  lineHeight: 1,
  fontSize: rem(12),
});

const TagText = styled.span({
  fontWeight: 700,
  lineHeight: 1,
  margin: `0 ${rem(4)}`,
});

const Introduce: React.FC<IntroduceProp> = ({ data }) => {
  const { title, description } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Introduce', field: 'title' });
  }
  if (!data.updatedAt) {
    throw new FieldError({ componentName: 'Introduce', field: 'data.updatedAt' });
  }
  const updatedDate = new Date(data.updatedAt).getTime();
  const nowDate = new Date().getTime();
  const diffDate = Math.floor((nowDate - updatedDate) / (24 * 3600 * 1000));
  return description ? (
    <Container>
      <IntroduceWrapper>
        <SectionTitle title={title} />
        <IntroduceData>
          <IntroduceText>
            {description}
          </IntroduceText>
          <UpdateInfoWrapper>
            <TagTextLabel>Updated At</TagTextLabel>
            <Tag className={css({ padding: `${rem(2)} ${rem(4)}` })}>
              <TagText>{data.updatedAt.replace(/\//g, '. ')}</TagText>
              <TagText>{diffDate === 0 ? '(Today)' : `(D+${diffDate})`}</TagText>
            </Tag>
          </UpdateInfoWrapper>
        </IntroduceData>
      </IntroduceWrapper>
    </Container>
  ) : null;
};

export default Introduce;

export const query = graphql`
  fragment IntroduceData on Introduce {
    title
    description
    updatedAt
  }
`;
