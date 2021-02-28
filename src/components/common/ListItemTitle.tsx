import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/utils/themeContext';

type ListItemTitleProps = {
  className?: string;
};

const Container = styled.div(props => ({
  textAlign: 'left',
  color: '#3E424B',
  padding: `0 ${rem(16)}`,
  fontSize: rem(20),
  [props.theme.media['md']]: {
    fontSize: rem(22),
    textAlign: 'right',
    flex: '0 0 25%',
    maxWidth: '25%',
  },
}));

const Title = styled.h3({
  margin: 0,
  lineHeight: 1,
  fontSize: 'inherit',
  fontWeight: 700,
});

const ListItemTitle: React.FC<ListItemTitleProps> = ({
  className,
  children,
}) => (
  <Container className={className}>
    <Title>{children}</Title>
  </Container>
);
export default ListItemTitle;
