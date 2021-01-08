import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

type SectionTitleProps = {
  title: string,
};

const Container = styled.div({
  display: 'flex',
  paddingBottom: rem(8),
});

const Title = styled.h2((props) => ({
  fontWeight: 'bold',
  lineHeight: 1,
  color: '#0197f6',
  margin: 0,
  fontSize: rem(36),
  padding: `0 ${rem(16)}`,
  [props.theme.media['md']]: {
    padding: 0,
  },
}));

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  children,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default SectionTitle;