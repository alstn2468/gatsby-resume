import * as React from 'react';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';
import { Fab as BaseFab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

import { ReactComponent as TranslationIconSvg } from '~/src/components/fab/translation.svg';
import { ReactComponent as ExportIconSvg } from '~/src/components/fab/export.svg';


type FabProps = {
  language: string,
};

const Icon = styled.svg({
  fill: '#FFFFFF',
  stroke: '#FFFFFF',
  width: '40%',
  height: '40%',
});

const TranslationIcon = Icon.withComponent(TranslationIconSvg);

const ExportIcon = Icon.withComponent(ExportIconSvg);

const Fab: React.FC<FabProps> = ({
  language,
}) => {
  const handleChangeLanguageButton = React.useCallback(() => {
    switch (language) {
      case 'en':
        return navigate('/ko/');
      case 'ko':
        return navigate('/en/');
      default:
        throw new Error('Unknown langauge passed at Fab component.');
    }
  }, [language]);
  const handleExportButton = React.useCallback(() => {
    alert('Export to PDF file.')
  }, []);
  return (
    <BaseFab
      event='click'
      icon={<span>+</span>}
      mainButtonStyles={{
        backgroundColor: '#192bc2',
      }}
    >
      <Action
        style={{
          backgroundColor: '#0197f6',
        }}
        text='Change Language'
        onClick={handleChangeLanguageButton}
      >
        <TranslationIcon />
      </Action>
      <Action
        style={{
          backgroundColor: '#0197f6',
        }}
        text='Export to PDF'
        onClick={handleExportButton}
      >
        <ExportIcon />
      </Action>
    </BaseFab >
  );
};

export default Fab;