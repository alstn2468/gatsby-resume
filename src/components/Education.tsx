import * as React from 'react';
import { graphql } from 'gatsby';
import SectionTitle from '~/src/components/SectionTitle';
import { FieldError } from '~/src/utils';

type EducationProp = {
  data: GatsbyTypes.EducationDataFragment;
};

const Education: React.FC<EducationProp> = ({ data }) => {
  const { title, data: educationData } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Education', field: 'title' });
  }
  return educationData.length > 0 ? (
    <div>
      <SectionTitle title={title} />
      <ul>
        {educationData.map((educationValue, valueIdx) => (
          <li key={`education-value-${valueIdx}`}>
            <h3>{educationValue?.title}</h3>
            <p>{educationValue?.startDate} ~ {educationValue?.endDate}</p>
            <p>{educationValue?.major}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Education;

export const query = graphql`
  fragment EducationData on Education {
    title
    data {
      title
      startDate
      endDate
      major
    }
  }
`;
