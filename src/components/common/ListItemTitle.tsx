import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

type ListItemTitlerops = {
  className?: string,
};

const Container = styled.div((props) => ({
  textAlign: 'left',
  color: '#3E424B',
  padding: `0 ${rem(16)}`,
  fontSize: rem(18),
  [props.theme.media['md']]: {
    fontSize: rem(20),
    textAlign: 'right',
    flex: '0 0 25%',
    maxWidth: '25%',
  },
}));

const Title = styled.h3({
  margin: 0,
  lineHeight: 1,
});

const ListItemTitle: React.FC<ListItemTitlerops> = ({ className, children }) => (
  <Container className={className}>
    <Title>{children}</Title>
  </Container>
);
export default ListItemTitle;