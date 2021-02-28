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
  ListItemData,
  Link,
} from '~/src/components/common';
import { FieldError } from '~/src/utils';
import { styled } from '~/src/utils/themeContext';

type PaperProp = {
  data: GatsbyTypes.PaperDataFragment;
};

const DescriptionItem = styled.li({
  width: '100%',
});

const Paper: React.FC<PaperProp> = ({ data }) => {
  const { title, data: paperData } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Paper', field: 'title' });
  }
  return paperData.length > 0 ? (
    <Container>
      <SectionTitle title={title} />
      <List>
        {paperData.map((paperValue, valueIdx) => {
          if (!paperValue?.title) {
            throw new FieldError({
              componentName: 'Paper',
              field: 'paperValue.title',
            });
          }
          if (!paperValue?.description) {
            throw new FieldError({
              componentName: 'Paper',
              field: 'paperValue.description',
            });
          }
          return (
            <ListItem key={`paper-value-${valueIdx}`}>
              <ListItemTitle>{paperValue.title}</ListItemTitle>
              <ListItemData className={css({ paddingLeft: rem(40) })}>
                {paperValue.description.map(
                  (descriptionValue, desciptionIdx) => (
                    <DescriptionItem
                      key={`paper-value-description-${desciptionIdx}`}
                    >
                      {descriptionValue}
                    </DescriptionItem>
                  ),
                )}
                {paperValue?.link && (
                  <DescriptionItem>
                    <Link link={paperValue.link} />
                  </DescriptionItem>
                )}
              </ListItemData>
            </ListItem>
          );
        })}
      </List>
    </Container>
  ) : null;
};

export default Paper;

export const query = graphql`
  fragment PaperData on Paper {
    title
    data {
      title
      description
      link
    }
  }
`;
