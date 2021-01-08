import * as React from 'react';
import { graphql } from 'gatsby';
import SectionTitle from '~/src/components/SectionTitle';
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
    <div>
      <SectionTitle title={title} />
      <pre>{description}</pre>
    </div>
  ) : null;
};

export default Introduce;

export const query = graphql`
  fragment IntroduceData on Introduce {
    title
    description
  }
`;
