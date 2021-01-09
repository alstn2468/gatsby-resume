import * as React from 'react';
import { graphql } from 'gatsby';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';
import {
  SectionTitle,
  Container,
  List,
  ListItem,
  ListItemTitle,
  ListItemData,
} from '~/src/components/common';
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
    <Container>
      <SectionTitle title={title} />
      {experienceData && (
        <List>
          {experienceData.map(((experienceValue, idx) => {
            if (!experienceValue?.title) {
              throw new FieldError({ componentName: 'Experience', field: 'experienceValue.title' });
            }
            if (!experienceValue?.startDate) {
              throw new FieldError({ componentName: 'Experience', field: 'experienceValue.startDate' });
            }
            if (!experienceValue.position) {
              throw new FieldError({ componentName: 'Experience', field: 'experienceValue.position' });
            }
            return (
              <ListItem key={`experience-${idx}`}>
                <ListItemTitle>{experienceValue.title}</ListItemTitle>
                <ListItemData>
                  <p>{experienceValue.startDate} ~ {experienceValue?.endDate}</p>
                  <p>{experienceValue.position}</p>
                  {experienceValue?.description.map((description, idx) => (
                    <p key={`experience-description-${idx}`}>{description}</p>
                  ))}
                  {experienceValue?.skill.map((skill, idx) => (
                    <span key={`experiene-skill-${idx}`}>
                      {skill}
                      {idx !== experienceValue.skill.length - 1 ? ' / ' : ''}
                    </span>
                  ))}
                </ListItemData>
              </ListItem>
            );
          }))}
        </List>
      )}
    </Container>
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