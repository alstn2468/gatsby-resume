import * as React from 'react';
import { rem } from 'polished'
import { cx } from '@emotion/css'
import { Link, useStaticQuery, graphql } from 'gatsby';
import { styled } from '~/src/components/themeContext';
import { useLanguage } from './l10nContext';

const anchorStyles = {
  ':visited': {
    color: '#192bc2',
  },
  '&.disabled': {
    pointerEvents: 'none',
    textDecoration: 'none',
    color: '#000000',
  },
} as React.CSSProperties;

const Container = styled.footer({
  textAlign: 'center',
  marginBottom: rem(32),
});

const Anchor = styled.a({ ...anchorStyles });

const Sub = styled.sub({
  display: 'inline-flex',
  alignItems: 'center',
  '&:not(:last-child)': {
    ':after': {
      textDecoration: 'none',
      color: '#000000',
      margin: `0 ${rem(4)}`,
      content: '"/"',
      fontSize: 10,
    }
  },
  '& a': {
    ...anchorStyles,
  },
})

const Footer: React.FC = () => {
  const currentLanguage = useLanguage();
  const data = useStaticQuery<GatsbyTypes.FooterQuery>(graphql`
    query Footer {
      allTarget {
        nodes {
          language
        }
      }
    }
  `);
  const languages = data.allTarget.nodes.map((node) => node.language);
  return (
    <Container>
      <div>
        <sub>
          <sup>Written by <Anchor href="https://github.com/alstn2468">@Minsu Kim</Anchor></sup>
        </sub>
        <small>✌</small>
      </div>
      <div>
        {languages.map((language) => (
          <Sub key={`footer-link-${language}`}>
            <Link
              to={`/${language}`}
              className={cx(language === currentLanguage && 'disabled')}
            >
              {language.toUpperCase()}
            </Link>
          </Sub>
        ))}
      </div>
    </Container>
  )
}

export default Footer;