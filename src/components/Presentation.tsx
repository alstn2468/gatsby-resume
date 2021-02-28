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

type PresentationProp = {
  data: GatsbyTypes.PresentationDataFragment;
};

const DescriptionItem = styled.li({
  width: '100%',
});

const Presentation: React.FC<PresentationProp> = ({ data }) => {
  const { title, data: presentationData } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Presentation', field: 'title' });
  }
  return presentationData.length > 0 ? (
    <Container>
      <SectionTitle title={title} />
      <List>
        {presentationData.map((presentationValue, valueIdx) => {
          if (!presentationValue?.title) {
            throw new FieldError({
              componentName: 'Presentation',
              field: 'presentationValue.title',
            });
          }
          if (!presentationValue?.description) {
            throw new FieldError({
              componentName: 'Presentation',
              field: 'presentationValue.description',
            });
          }
          return (
            <ListItem key={`presentation-value-${valueIdx}`}>
              <ListItemTitle>{presentationValue.title}</ListItemTitle>
              <ListItemData className={css({ paddingLeft: rem(40) })}>
                {presentationValue.description.map(
                  (descriptionValue, desciptionIdx) => (
                    <DescriptionItem
                      key={`presentation-value-description-${desciptionIdx}`}
                    >
                      {descriptionValue}
                    </DescriptionItem>
                  ),
                )}
                {presentationValue?.link && (
                  <DescriptionItem>
                    <Link link={presentationValue.link} />
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

export default Presentation;

export const query = graphql`
  fragment PresentationData on Presentation {
    title
    data {
      title
      description
      link
    }
  }
`;
