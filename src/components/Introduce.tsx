import * as React from 'react';
import { graphql } from 'gatsby';
import { rem } from 'polished';
import SectionTitle from '~/src/components/SectionTitle';
import { styled } from '~/src/components/themeContext';
import { FieldError } from '~/src/utils';

type IntroduceProp = {
  data: GatsbyTypes.IntroduceDataFragment;
};

const Container = styled.div((props) => ({
  marginTop: rem(16),
  [props.theme.media['md']]: {
    marginTop: rem(32),
  },
}));

const Introduce: React.FC<IntroduceProp> = ({ data }) => {
  const { title, description } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Introduce', field: 'title' });
  }
  return description ? (
    <Container>
      <SectionTitle title={title} />
      <pre>{description}</pre>
    </Container>
  ) : null;
};

export default Introduce;

export const query = graphql`
  fragment IntroduceData on Introduce {
    title
    description
  }
`;
