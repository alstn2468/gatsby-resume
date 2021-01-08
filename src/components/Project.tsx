import * as React from 'react';
import { graphql } from 'gatsby';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';
import { SectionTitle, Container } from '~/src/components/common';
import { FieldError } from '~/src/utils';

type ProjectProps = {
  data: GatsbyTypes.ProjectDataFragment;
};

const Project: React.FC<ProjectProps> = ({
  data,
}) => {
  const { data: projectData, title } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Project', field: 'title' });
  }
  return projectData.length > 0 ? (
    <Container>
      <SectionTitle title={title} />
      <ul>
        {projectData.map(((projectValue, idx) => (
          <li key={`Project-${idx}`}>
            <h3>{projectValue?.title}</h3>
            <p>{projectValue?.company}</p>
            <p>{projectValue?.startDate} ~ {projectValue?.endDate}</p>
            {projectValue?.description.map((description, idx) => (
              <div key={`Project-description-${idx}`}>
                <p>{description.title}</p>
                {description?.detail.length > 0 && (
                  <ul>
                    {description.detail.map((detailValue, idx) => (
                      <li key={`project-description-detail-${idx}`}>{detailValue}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </li>
        )))}
      </ul>
    </Container>
  ) : null;
};

export default Project;

export const query = graphql`
  fragment ProjectData on Project {
    title
    data {
      title
      company
      startDate
      endDate
      description {
        title
        detail
      }
    }
  }
`;