import * as React from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/css';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';
import { useTranslation } from '~/src/components/l10nContext';
import {
  SectionTitle,
  Container,
  Tag,
  List,
  ListItem,
  ListItemTitle,
  ListItemData,
  ListItemDataTitle,
} from '~/src/components/common';
import { FieldError } from '~/src/utils';

type ExperienceProps = {
  data: GatsbyTypes.ExperienceDataFragment;
};

const ListItemWrapper = styled.div({
  width: '100%',
});

const PositionText = styled.i({
  fontSize: rem(16),
  color: '#3E424B',
});

const DescriptionList = styled.ul({
  paddingTop: rem(16),
  marginBottom: rem(16),
  listStyle: 'disc',
});

const DescriptionItem = styled.li({});

const TagCategoryText = styled.span({});

const TagWrapper = styled.div({
  width: '100%',
  paddingTop: rem(4),
});

const Experience: React.FC<ExperienceProps> = ({
  data,
}) => {
  const { data: experienceData, title } = data;
  const t = useTranslation();
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
                <ListItemData className={css({ paddingLeft: rem(20) })}>
                  <ListItemWrapper>
                    <ListItemDataTitle>
                      {experienceValue.startDate} ~ {experienceValue?.endDate}
                    </ListItemDataTitle>
                  </ListItemWrapper>
                  <ListItemWrapper>
                    <PositionText>{experienceValue.position}</PositionText>
                  </ListItemWrapper>
                  {experienceValue.description && (
                    <ListItemWrapper>
                      <DescriptionList>
                        {experienceValue?.description.map((description, idx) => (
                          <DescriptionItem key={`experience-description-${idx}`}>{description}</DescriptionItem>
                        ))}
                        {experienceValue.skill && (
                          <DescriptionItem>
                            <TagCategoryText>{t('Experience_tagCategory_text')}</TagCategoryText>
                            <TagWrapper>
                              {experienceValue?.skill.map((skill, idx) => (
                                <Tag key={`experiene-skill-${idx}`} >
                                  {skill}
                                </Tag>
                              ))}
                            </TagWrapper>
                          </DescriptionItem>
                        )}
                      </DescriptionList>
                    </ListItemWrapper>
                  )}
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