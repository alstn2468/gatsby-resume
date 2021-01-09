import * as React from 'react';
import { graphql } from 'gatsby';
import { FieldError } from '~/src/utils'
import {
  SectionTitle,
  Container,
  List,
  ListItem,
  ListItemTitle,
  ListItemData,
} from '~/src/components/common';
import SkillDataItem from '~/src/components/skill/SkillDataItem';
import Criteria from '~/src/components/skill/Criteria';

type SkillProps = {
  data: GatsbyTypes.SkillDataFragment,
};

const Skill: React.FC<SkillProps> = ({
  data,
}) => {
  const { title, category, criteria } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Skill', field: 'title' });
  }
  if (!criteria) {
    throw new FieldError({ componentName: 'Skill', field: 'criteria' });
  }
  return category.length > 0 ? (
    <Container>
      <SectionTitle title={title}>
        <Criteria data={criteria} />
      </SectionTitle>
      <List>
        {category.map((categoryValue, categoryIdx) => {
          if (!categoryValue?.category) {
            throw new FieldError({ componentName: 'Skill', field: 'categoryValue.category' });
          }
          if (!categoryValue.data) {
            throw new FieldError({ componentName: 'Skill', field: 'categoryValue.data' });
          }
          return (
            <ListItem key={`skill-category-${categoryIdx}`}>
              <ListItemTitle>{categoryValue.category}</ListItemTitle>
              <ListItemData>
                {categoryValue.data.map((skillData, skillDataIdx) => {
                  if (!skillData?.name) {
                    throw new FieldError({ componentName: 'Skill', field: 'skillData.name' });
                  }
                  if (!skillData?.level) {
                    throw new FieldError({ componentName: 'Skill', field: 'skillData.level' });
                  }
                  return (
                    <SkillDataItem
                      key={`skill-${categoryValue}-${skillDataIdx}`}
                      name={skillData.name}
                      level={skillData.level}
                    />
                  )
                })}
              </ListItemData>
            </ListItem>
          );
        })}
      </List>
    </Container>
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