import * as React from 'react';
import { styled } from '~/src/components/themeContext';

type LinkProps = {
  link: string,
};

const LinkContainer = styled.a({
  color: '#192bc2',
  background: 'transparent',
  wordBreak: 'break-all',
  ':visited': {
    color: '#192bc2',
  },
});

const Link: React.FC<LinkProps> = ({ link }) => {
  return (
    <LinkContainer
      href={link}
      target="_blank"
      rel="noreferrer noopener"
    >
      {link}
    </LinkContainer>
  );
};

export default Link;