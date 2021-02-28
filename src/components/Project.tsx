import * as React from 'react';
import { graphql } from 'gatsby';
import { rem } from 'polished';
import { css } from '@emotion/css';
import { styled } from '~/src/utils/themeContext';
import {
  SectionTitle,
  Container,
  List,
  ListItem,
  ListItemTitle,
  ListItemData as BaseListItemData,
  ListItemDataWrapper,
  ListItemDataTitle,
  ListItemDataSubTitle,
} from '~/src/components/common';
import { FieldError } from '~/src/utils';

type ProjectProps = {
  data: GatsbyTypes.ProjectDataFragment;
};

const ListItemData = BaseListItemData.withComponent('div');

const CompanyText = styled(ListItemDataSubTitle)({
  display: 'block',
  marginBottom: rem(16),
});

const DescriptionTitle = styled.p({
  margin: 0,
});

const DescriptionDetailList = styled.ul({
  marginTop: 0,
  paddingBottom: 0,
  paddingTop: rem(8),
  marginBottom: rem(8),
  listStyle: 'disc',
});

const DescriptionDetailItem = styled.li({});

const Project: React.FC<ProjectProps> = ({ data }) => {
  const { data: projectData, title } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Project', field: 'title' });
  }
  return projectData.length > 0 ? (
    <Container>
      <SectionTitle title={title} />
      <List>
        {projectData.map((projectValue, idx) => {
          if (!projectValue?.title) {
            throw new FieldError({
              componentName: 'Project',
              field: 'projectValue.title',
            });
          }
          if (!projectValue?.company) {
            throw new FieldError({
              componentName: 'Project',
              field: 'projectValue.company',
            });
          }
          if (!projectValue?.startDate) {
            throw new FieldError({
              componentName: 'Project',
              field: 'projectValue.startDate',
            });
          }
          return (
            <ListItem key={`Project-${idx}`}>
              <ListItemTitle>
                {projectValue.startDate} ~ {projectValue?.endDate}
              </ListItemTitle>
              <ListItemData className={css({ paddingLeft: rem(20) })}>
                <ListItemDataWrapper>
                  <ListItemDataTitle>{projectValue.title}</ListItemDataTitle>
                </ListItemDataWrapper>
                <ListItemDataWrapper>
                  <CompanyText>{projectValue.company}</CompanyText>
                </ListItemDataWrapper>
                {projectValue?.description.map((description, idx) => {
                  if (!description.title) {
                    throw new FieldError({
                      componentName: 'Project',
                      field: 'description.title',
                    });
                  }
                  return (
                    <ListItemDataWrapper key={`project-description-${idx}`}>
                      <DescriptionTitle>{description.title}</DescriptionTitle>
                      {description?.detail.length > 0 && (
                        <DescriptionDetailList>
                          {description.detail.map((detailValue, idx) => (
                            <DescriptionDetailItem
                              key={`project-description-detail-${idx}`}
                            >
                              {detailValue}
                            </DescriptionDetailItem>
                          ))}
                        </DescriptionDetailList>
                      )}
                    </ListItemDataWrapper>
                  );
                })}
              </ListItemData>
            </ListItem>
          );
        })}
      </List>
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
