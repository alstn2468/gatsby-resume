import { rem } from 'polished';
import { styled } from '~/src/utils/themeContext';

const List = styled.ul(props => ({
  padding: 0,
  [props.theme.media['md']]: {
    padding: `0 ${rem(16)}`,
  },
}));

export default List;
