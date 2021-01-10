
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

const ListItemDataTitle = styled.h4((props) => ({
  margin: 0,
  marginBottom: rem(8),
  lineHeight: 1.2,
  fontSize: rem(16),
  fontWeight: 700,
  [props.theme.media['md']]: {
    fontSize: rem(18),
  },
}));

export default ListItemDataTitle;