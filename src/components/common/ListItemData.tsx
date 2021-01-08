import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

const Container = styled.ul((props) => ({
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

const ListItemData: React.FC = ({ children }) => <Container>{children}</Container>;

export default ListItemData;