import * as React from 'react';
import { graphql } from 'gatsby';
import SectionTitle from '~/src/components/SectionTitle';
import { FieldError } from '~/src/utils';

type ExperienceProps = {
  data: GatsbyTypes.ExperienceDataFragment;
};

const Experience: React.FC<ExperienceProps> = ({
  data,
}) => {
  const { data: experienceData, title } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Experience', field: 'title' });
  }
  return experienceData.length > 0 ? (
    <div>
      <SectionTitle title={title} />
      {experienceData && (
        <ul>
          {experienceData.map(((experienceValue, idx) => (
            <li key={`experience-${idx}`}>
              <h3>{experienceValue?.title}</h3>
              <p>{experienceValue?.startDate} ~ {experienceValue?.endDate}</p>
              <p>{experienceValue?.position}</p>
              {experienceValue?.description.map((description, idx) => (
                <p key={`experience-description-${idx}`}>{description}</p>
              ))}
              {experienceValue?.skill.map((skill, idx) => (
                <span key={`experiene-skill-${idx}`}>
                  {skill}
                  {idx !== experienceValue.skill.length - 1 ? ' / ' : ''}
                </span>
              ))}
            </li>
          )))}
        </ul>
      )}
    </div>
  ) : null;
};

export default Experience;

export const query = graphql`
  fragment ExperienceData on Experience {
    title
    data {
      title
      startDate
      endDate
      position
      description
      skill
    }
  }
`;