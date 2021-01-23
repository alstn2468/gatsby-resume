import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

type LinkProps = {
  icon?: React.ReactNode,
  link: string,
};

const LinkContainer = styled.a({
  color: '#192bc2',
  background: 'transparent',
  wordBreak: 'break-all',
  display: 'flex',
  ':visited': {
    color: '#192bc2',
  },
});

const Link: React.FC<LinkProps> = ({
  icon,
  link,
  children
}) => {
  return (
    <LinkContainer
      href={link}
      target="_blank"
      rel="noreferrer noopener"
    >
      {icon && icon}
      {children ? children : link}
    </LinkContainer>
  );
};

export default Link;