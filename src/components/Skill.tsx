import * as React from 'react';
import { graphql } from 'gatsby';

type SkillProps = {
  data: GatsbyTypes.SkillDataFragment;
};

const Skill: React.FC<SkillProps> = ({
  data,
}) => {
  const { title, category } = data;
  if (!title) {
    throw new Error('Skill: Not found title.');
  }
  return category.length > 0 ? (
    <div>
      <h2>{title}</h2>
      {data.criteria && (
        <ul>
          {data.criteria.map((criteriaValue, criteriaIdx) => (
            <li key={`skill-criteria-${criteriaIdx}`}>{criteriaValue}</li>
          ))}
        </ul>
      )}
      <ul>
        {category.map((categoryValue, categoryIdx) => (
          <li key={`skill-category-${categoryIdx}`}>
            <h3>{categoryValue?.category}</h3>
            {categoryValue?.data.map((skillData, skillDataIdx) => (
              <p key={`skill-${categoryValue}-${skillDataIdx}`}>
                {skillData?.name} - {skillData?.level}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Skill;

export const query = graphql`
  fragment SkillData on Skill {
    title
    criteria
    category {
      category
      data {
        name
        level
      }
    }
  }
`;