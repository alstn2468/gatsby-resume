import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';

type SkillDataItemProps = {
  name: string;
  level: number;
};

const Container = styled.li((props) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: rem(14),
  marginBottom: rem(8),
  paddingLeft: rem(16),
  flex: '0 0 50%',
  maxWidth: '50%',
  [props.theme.media['md']]: {
    flex: '0 0 33.33333%',
    maxWidth: '33.33333%',
    paddingLeft: rem(40),
  },
}));

const NameText = styled.span({
  display: 'block',
  lineHeight: '1.5',
  height: rem(24),
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

const LevelText = styled.span({
  display: 'block',
  textAlign: 'center',
  background: '#0197f6',
  color: '#FFFFFF',
  fontWeight: 'bold',
  width: rem(24),
  minWidth: rem(24),
  height: rem(24),
  borderRadius: rem(20),
  marginRight: rem(6),
});

const SkillDataItem: React.FC<SkillDataItemProps> = ({
  name,
  level,
}) => {
  return (
    <Container>
      <LevelText>{level}</LevelText>
      <NameText>{name}</NameText>
    </Container>
  );
};

export default SkillDataItem;