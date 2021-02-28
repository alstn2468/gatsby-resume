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

type OpenSourceProp = {
  data: GatsbyTypes.OpenSourceDataFragment;
};

const DescriptionItem = styled.li({
  width: '100%',
});

const OpenSource: React.FC<OpenSourceProp> = ({ data }) => {
  const { title, data: openSourceData } = data;
  if (!title) {
    throw new FieldError({ componentName: 'OpenSource', field: 'title' });
  }
  return openSourceData.length > 0 ? (
    <Container>
      <SectionTitle title={title} />
      <List>
        {openSourceData.map((openSourceValue, valueIdx) => {
          if (!openSourceValue?.title) {
            throw new FieldError({
              componentName: 'OpenSource',
              field: 'openSourceValue.title',
            });
          }
          if (!openSourceValue?.description) {
            throw new FieldError({
              componentName: 'OpenSource',
              field: 'openSourceValue.description',
            });
          }
          return (
            <ListItem key={`open-source-value-${valueIdx}`}>
              <ListItemTitle>{openSourceValue.title}</ListItemTitle>
              <ListItemData className={css({ paddingLeft: rem(40) })}>
                {openSourceValue.description.map(
                  (descriptionValue, desciptionIdx) => (
                    <DescriptionItem
                      key={`open-source-value-description-${desciptionIdx}`}
                    >
                      {descriptionValue}
                    </DescriptionItem>
                  ),
                )}
                {openSourceValue?.link && (
                  <DescriptionItem>
                    <Link link={openSourceValue.link} />
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

export default OpenSource;

export const query = graphql`
  fragment OpenSourceData on Opensource {
    title
    data {
      title
      description
      link
    }
  }
`;
