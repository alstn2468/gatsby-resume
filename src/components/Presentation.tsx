import * as React from 'react';
import { graphql } from 'gatsby';
import SectionTitle from '~/src/components/SectionTitle';
import { FieldError } from '~/src/utils';

type PresentationProp = {
  data: GatsbyTypes.PresentationDataFragment;
};

const Presentation: React.FC<PresentationProp> = ({ data }) => {
  const { title, data: presentationData } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Presentation', field: 'title' });
  }
  return presentationData.length > 0 ? (
    <div>
      <SectionTitle title={title} />
      <ul>
        {presentationData.map((presentationValue, valueIdx) => (
          <li key={`presentation-value-${valueIdx}`}>
            <h3>{presentationValue?.title}</h3>
            {presentationValue?.description.map((descriptionValue, desciptionIdx) => (
              <p key={`presentation-value-description-${desciptionIdx}`}>{descriptionValue}</p>
            ))}
            {presentationValue?.link && (
              <a href={presentationValue.link}>LINK</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Presentation;

export const query = graphql`
  fragment PresentationData on Presentation {
    title
    data {
      title
      description
      link
    }
  }
`;
