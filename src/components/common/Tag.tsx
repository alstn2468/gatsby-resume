import * as React from 'react';
import { cx, css } from '@emotion/css';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

type TagProps = {
  color?: string,
  className?: string,
};

const Container = styled.span({
  display: 'inline-block',
  padding: `${rem(3)} ${rem(8)}`,
  borderRadius: rem(6),
  color: '#FFFFFF',
  fontSize: rem(12),
  lineHeight: 1.5,
  backgroundColor: '#000000',
  textAlign: 'center',
  ':not(:last-of-type)': {
    marginRight: rem(4),
  },
});

const Tag: React.FC<TagProps> = ({
  color,
  className,
  children,
}) => {
  return (
    <Container
      className={`${className} ${cx(color && css({ backgroundColor: color }))}`}
    >
      {children}
    </Container>
  );
};

export default Tag;