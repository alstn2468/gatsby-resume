import * as React from 'react';
import { styled } from '~/src/utils/themeContext';

type LinkProps = {
  link: string;
};

const LinkContainer = styled.a({
  color: '#192bc2',
  background: 'transparent',
  wordBreak: 'break-all',
  ':visited': {
    color: '#192bc2',
  },
});

const Link: React.FC<LinkProps> = ({ link, children }) => {
  return (
    <LinkContainer href={link} target="_blank" rel="noreferrer noopener">
      {children ? children : link}
    </LinkContainer>
  );
};

export default Link;
