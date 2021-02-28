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
  ListItemDataWrapper,
} from '~/src/components/common';
import { FieldError } from '~/src/utils';
import { styled } from '~/src/utils/themeContext';

type EtcProp = {
  data: GatsbyTypes.EtcDataFragment;
};

const DescriptionList = styled.ul({
  paddingLeft: rem(22),
  paddingTop: rem(8),
  marginBottom: rem(16),
  listStyle: 'disc',
});

const ListItemData = BaseListItemData.withComponent('div');

const DescriptionItem = styled.li({});

const Etc: React.FC<EtcProp> = ({ data }) => {
  const { title, data: etcData } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Etc', field: 'title' });
  }
  return etcData.length > 0 ? (
    <Container>
      <SectionTitle title={title} />
      <List>
        {etcData.map((etcValue, valueIdx) => {
          if (!etcValue?.title) {
            throw new FieldError({
              componentName: 'Etc',
              field: 'etcValue.title',
            });
          }
          if (!etcValue?.startDate) {
            throw new FieldError({
              componentName: 'Etc',
              field: 'etcValue.startDate',
            });
          }
          if (!etcValue?.description) {
            throw new FieldError({
              componentName: 'Etc',
              field: 'etcValue.description',
            });
          }
          return (
            <ListItem key={`etc-value-${valueIdx}`}>
              <ListItemTitle>
                {etcValue.startDate} ~ {etcValue?.endDate}
              </ListItemTitle>
              <ListItemData className={css({ paddingLeft: rem(40) })}>
                <ListItemDataWrapper>
                  <ListItemDataTitle>{etcValue.title}</ListItemDataTitle>
                </ListItemDataWrapper>
                <ListItemDataWrapper>
                  <DescriptionList>
                    {etcValue.description.map((description, idx) => (
                      <DescriptionItem key={`etc-value-description-${idx}`}>
                        {description}
                      </DescriptionItem>
                    ))}
                  </DescriptionList>
                </ListItemDataWrapper>
              </ListItemData>
            </ListItem>
          );
        })}
      </List>
    </Container>
  ) : null;
};

export default Etc;

export const query = graphql`
  fragment EtcData on Etc {
    title
    data {
      title
      startDate
      endDate
      description
    }
  }
`;
