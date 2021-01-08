import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

const Item = styled.li((props) => ({
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

const ListItem: React.FC = ({ children }) => <Item>{children}</Item>;

export default ListItem;