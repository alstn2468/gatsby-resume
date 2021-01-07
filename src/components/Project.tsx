import * as React from 'react';
import { graphql } from 'gatsby';

type ProjectProps = {
  data: GatsbyTypes.ProjectDataFragment;
};

const Project: React.FC<ProjectProps> = ({
  data,
}) => {
  const { data: projectData, title } = data;
  if (!title) {
    throw new Error('Project: Not found title.')
  }
  return projectData.length > 0 ? (
    <div>
      <h2>{title}</h2>
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
    </div>
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