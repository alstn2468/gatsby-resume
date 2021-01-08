import * as React from 'react';
import { graphql } from 'gatsby';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';
import { SectionTitle, Container } from '~/src/components/common';
import { FieldError } from '~/src/utils';

type IntroduceProp = {
  data: GatsbyTypes.IntroduceDataFragment;
};

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
