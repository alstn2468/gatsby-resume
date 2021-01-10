import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

const List = styled.dl((props) => ({
  padding: 0,
  [props.theme.media['md']]: {
    padding: `0 ${rem(16)}`,
  },
}));

export default List;