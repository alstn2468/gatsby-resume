import * as React from 'react';
import { rem } from 'polished';
import { styled } from '~/src/utils/themeContext';
import { ReactComponent as TooltipIconSvg } from '~/src/components/skill/tooltip.svg';

type CriteriaProps = {
  data: readonly string[];
};

const Container = styled.div({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: rem(8),
  ':hover': {
    '& > *': {
      opacity: 1,
    },
  },
});

const Icon = styled(TooltipIconSvg)({
  width: rem(24),
  height: rem(24),
});

const ListWrapper = styled.div(props => ({
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  position: 'absolute',
  top: 0,
  transform: 'translateY(55%)',
  backgroundColor: '#000000',
  color: '#FFFFFF',
  borderRadius: rem(6),
  [props.theme.media['md']]: {
    left: rem(36),
    transform: 'translateY(-25%)',
  },
}));

const CriteriaList = styled.ul({
  display: 'inline-block',
  listStyle: 'none',
  whiteSpace: 'nowrap',
  padding: `${rem(10)} ${rem(20)}`,
  margin: 0,
});

const ListArrow = styled.div(props => ({
  top: 0,
  left: '50%',
  transform: 'translateX(-50%) rotate(45deg)',
  marginTop: rem(-8),
  position: 'absolute',
  backgroundColor: '#000000',
  width: rem(16),
  height: rem(16),
  [props.theme.media['md']]: {
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
    left: 0,
    marginTop: 0,
    marginLeft: rem(-8),
  },
}));

const Item = styled.li({
  fontSize: rem(14),
});

const Criteria: React.FC<CriteriaProps> = ({ data }) => {
  return (
    <Container>
      <Icon />
      <ListWrapper>
        <ListArrow />
        <CriteriaList>
          {data.map((criteriaValue, criteriaIdx) => (
            <Item key={`skill-criteria-${criteriaIdx}`}>
              {`${criteriaIdx + 1} - ${criteriaValue}`}
            </Item>
          ))}
        </CriteriaList>
      </ListWrapper>
    </Container>
  );
};

export default Criteria;
