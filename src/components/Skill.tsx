import * as React from 'react';
import { rem } from 'polished';
import { graphql } from 'gatsby';
import { FieldError } from '~/src/utils'
import { styled } from '~/src/components/themeContext';
import { SectionTitle, Container } from '~/src/components/common';
import SkillDataItem from '~/src/components/skill/SkillDataItem';
import { ReactComponent as TooltipIconSvg } from '~/src/components/skill/tooltip.svg';

type SkillProps = {
  data: GatsbyTypes.SkillDataFragment;
};

const CriteriaToolTip = styled.div({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: rem(8),
  ':hover': {
    '& > div': {
      opacity: 0.8,
    },
  },
});

const CriteriaIcon = styled(TooltipIconSvg)({
  width: rem(24),
  height: rem(24),
});

const CriteriaListWrapper = styled.div((props) => ({
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  position: 'absolute',
  top: 0,
  transform: 'translateY(55%)',
  backgroundColor: '#000000',
  color: '#FFFFFF',
  borderRadius: rem(6),
  [props.theme.media['md']]: {
    left: rem(36),
    transform: 'translateY(-25%)',
  },
}));

const CriteriaList = styled.ul({
  display: 'inline-block',
  listStyle: 'none',
  whiteSpace: 'nowrap',
  padding: `${rem(10)} ${rem(20)}`,
  margin: 0,
});

const CriteriaListArrow = styled.div((props) => ({
  top: 0,
  left: '50%',
  transform: 'translateX(-50%) rotate(45deg)',
  marginTop: rem(-8),
  position: 'absolute',
  backgroundColor: '#000000',
  opacity: 0.8,
  width: rem(16),
  height: rem(16),
  [props.theme.media['md']]: {
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
    left: 0,
    marginTop: 0,
    marginLeft: rem(-8),
  },
}));

const CriteriaItem = styled.li({
  fontSize: rem(14),
});

const SkillDataCategoryList = styled.dl((props) => ({
  padding: 0,
  [props.theme.media['md']]: {
    padding: `0 ${rem(16)}`,
  },
}));

const SkillDataCategoryItem = styled.li((props) => ({
  display: 'flex',
  margin: 0,
  flexDirection: 'column',
  paddingBottom: rem(8),
  ':not(:first-of-type)': {
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    paddingTop: rem(16),
  },
  [props.theme.media['md']]: {
    margin: `0 ${rem(-15)}`,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
}));

const SkillDataCategoryTitleWrapper = styled.div((props) => ({
  textAlign: 'left',
  color: '#3E424B',
  padding: `0 ${rem(16)}`,
  fontSize: rem(18),
  [props.theme.media['md']]: {
    fontSize: rem(24),
    textAlign: 'right',
    flex: '0 0 25%',
    maxWidth: '25%',
  },
}));

const SkillDataCategoryTitle = styled.h3({
  margin: 0,
  lineHeight: 1,
});

const SkillDataList = styled.ul((props) => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: 0,
  marginTop: rem(16),
  padding: 0,
  flex: '0 0 100%',
  maxWidth: '100%',
  [props.theme.media['md']]: {
    margin: 0,
    flex: '0 0 75%',
    maxWidth: '75%',
  },
}));

const Skill: React.FC<SkillProps> = ({
  data,
}) => {
  const { title, category } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Skill', field: 'title' });
  }
  return category.length > 0 ? (
    <Container>
      <SectionTitle title={title}>
        {data.criteria && (
          <CriteriaToolTip>
            <CriteriaIcon />
            <CriteriaListWrapper>
              <CriteriaListArrow />
              <CriteriaList>
                {data.criteria.map((criteriaValue, criteriaIdx) => (
                  <CriteriaItem key={`skill-criteria-${criteriaIdx}`}>
                    {`${criteriaIdx + 1} - ${criteriaValue}`}
                  </CriteriaItem>
                ))}
              </CriteriaList>
            </CriteriaListWrapper>
          </CriteriaToolTip>
        )}
      </SectionTitle>
      <SkillDataCategoryList>
        {category.map((categoryValue, categoryIdx) => (
          <SkillDataCategoryItem key={`skill-category-${categoryIdx}`}>
            <SkillDataCategoryTitleWrapper>
              <SkillDataCategoryTitle>{categoryValue?.category}</SkillDataCategoryTitle>
            </SkillDataCategoryTitleWrapper>
            {categoryValue?.data && (
              <SkillDataList>
                {categoryValue?.data.map((skillData, skillDataIdx) => {
                  if (!skillData?.name) {
                    throw new FieldError({ componentName: 'SkillData', field: 'name' });
                  }
                  if (!skillData?.level) {
                    throw new FieldError({ componentName: 'SkillData', field: 'level' });
                  }
                  return (
                    <SkillDataItem
                      key={`skill-${categoryValue}-${skillDataIdx}`}
                      name={skillData.name}
                      level={skillData.level}
                    />
                  )
                })}
              </SkillDataList>
            )}
          </SkillDataCategoryItem>
        ))}
      </SkillDataCategoryList>
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