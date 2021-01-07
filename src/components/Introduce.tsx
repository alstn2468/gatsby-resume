import * as React from 'react';
import { graphql } from 'gatsby';

type IntroduceProp = {
  data: GatsbyTypes.IntroduceDataFragment;
};

const Introduce: React.FC<IntroduceProp> = ({ data }) => {
  const { title, description } = data;
  if (!title) {
    throw new Error('Introduce: Not found title.');
  }
  return description ? (
    <div>
      <h2>{title}</h2>
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
