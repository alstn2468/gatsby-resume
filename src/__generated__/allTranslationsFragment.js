/* eslint-disable */
import { graphql } from 'gatsby';
export const fragments = graphql`
  fragment TranslationMessages_allMessages on TranslationMessagesMessages {
    Fab_changeLanguageButton_text {
      text
    }
    Fab_exportPdfButton_text {
      text
    }
    Experience_tagCategory_text {
      text
    }
  }
`;
