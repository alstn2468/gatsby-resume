import * as React from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/css';
import { rem } from 'polished';
import {
  SectionTitle,
  Container,
  List,
  ListItem,
  ListItemTitle,
  ListItemData as BaseListItemData,
  ListItemDataTitle,
  ListItemDataSubTitle,
} from '~/src/components/common';
import { FieldError } from '~/src/utils';
import { styled } from '~/src/components/themeContext';

type EducationProp = {
  data: GatsbyTypes.EducationDataFragment,
};

const DescriptionItem = styled.div({
  width: '100%',
});

const ListItemData = BaseListItemData.withComponent('div');

const Education: React.FC<EducationProp> = ({ data }) => {
  const { title, data: educationData } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Education', field: 'title' });
  }
  return educationData.length > 0 ? (
    <Container>
      <SectionTitle title={title} />
      <List>
        {educationData.map((educationValue, valueIdx) => {
          if (!educationValue?.title) {
            throw new FieldError({ componentName: 'Education', field: 'educationValue.title' });
          }
          if (!educationValue?.startDate) {
            throw new FieldError({ componentName: 'Education', field: 'educationValue.startDate' });
          }
          if (!educationValue?.major) {
            throw new FieldError({ componentName: 'Education', field: 'educationValue.major' });
          }
          return (
            <ListItem key={`education-value-${valueIdx}`}>
              <ListItemTitle>{educationValue.startDate} ~ {educationValue?.endDate}</ListItemTitle>
              <ListItemData className={css({ paddingLeft: rem(20) })}>
                <DescriptionItem>
                  <ListItemDataTitle>
                    {educationValue.title}
                  </ListItemDataTitle>
                </DescriptionItem>
                <DescriptionItem>
                  <ListItemDataSubTitle>
                    {educationValue.major}
                  </ListItemDataSubTitle>
                </DescriptionItem>
              </ListItemData>
            </ListItem>
          );
        })}
      </List>
    </Container>
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
