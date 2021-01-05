import * as React from 'react';
import { graphql } from 'gatsby';

type IntroduceProp = {
  data: GatsbyTypes.IntroduceDescriptionFragment;
};

const Introduce: React.FC<IntroduceProp> = ({ data }) => {
  const { title, description } = data;
  return (
    <div>
      {title && title}
      {description && description}
    </div>
  );
};

export default Introduce;

export const query = graphql`
  fragment IntroduceDescription on Introduce {
    title
    description
  }
`;
