import { rem } from 'polished';
import { styled } from '~/src/utils/themeContext';

const Container = styled.section(props => ({
  marginTop: rem(16),
  ':first-of-type': {
    marginTop: rem(24),
  },
  [props.theme.media['md']]: {
    marginTop: rem(32),
    ':first-of-type': {
      marginTop: rem(48),
    },
  },
}));

export default Container;
