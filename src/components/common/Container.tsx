import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

const BaseContainer = styled.div((props) => ({
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

const Container: React.FC = ({ children }) => <BaseContainer>{children}</BaseContainer>;

export default Container;