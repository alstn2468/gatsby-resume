import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/utils/themeContext';

type SectionTitleProps = {
  title: string;
  className?: string;
};

const Container = styled.div({
  display: 'flex',
  paddingBottom: rem(8),
});

const Title = styled.h2(props => ({
  fontWeight: 700,
  lineHeight: 1,
  color: '#0197f6',
  margin: 0,
  fontSize: rem(36),
  paddingLeft: rem(16),
  [props.theme.media['md']]: {
    padding: 0,
  },
}));

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <Container className={className}>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default SectionTitle;
