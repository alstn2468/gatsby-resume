import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

type ListProps = {
  className?: string,
};

const ListContainer = styled.dl((props) => ({
  padding: 0,
  [props.theme.media['md']]: {
    padding: `0 ${rem(16)}`,
  },
}));

const List: React.FC<ListProps> = ({ className, children }) => (
  <ListContainer className={className}>{children}</ListContainer>
);

export default List;