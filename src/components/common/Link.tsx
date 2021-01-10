import * as React from 'react';
import { styled } from '~/src/components/themeContext';

type LinkProps = {
  link: string,
};

const LinkContainer = styled.a({
  color: '#007bff',
  wordBreak: 'break-all',
  ':visited': {
    color: '#007bff',
  },
});

const Link: React.FC<LinkProps> = ({ link }) => {
  return (
    <LinkContainer
      href={link}
      rel="noreferrer noopener"
    >
      {link}
    </LinkContainer>
  );
};

export default Link;