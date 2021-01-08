import * as React from 'react';
import { graphql } from 'gatsby';
import { rem } from 'polished';
import { styled } from '~/src/components/themeContext';
import SectionTitle from '~/src/components/SectionTitle';
import { FieldError } from '~/src/utils';

type OpenSourceProp = {
  data: GatsbyTypes.OpenSourceDataFragment;
};

const Container = styled.div((props) => ({
  marginTop: rem(16),
  [props.theme.media['md']]: {
    marginTop: rem(32),
  },
}));

const OpenSource: React.FC<OpenSourceProp> = ({ data }) => {
  const { title, data: openSourceData } = data;
  if (!title) {
    throw new FieldError({ componentName: 'OpenSource', field: 'title' });
  }
  return openSourceData.length > 0 ? (
    <Container>
      <SectionTitle title={title} />
      <ul>
        {openSourceData.map((openSourceValue, valueIdx) => (
          <li key={`open-source-value-${valueIdx}`}>
            <h3>{openSourceValue?.title}</h3>
            {openSourceValue?.description.map((descriptionValue, desciptionIdx) => (
              <p key={`open-source-value-description-${desciptionIdx}`}>{descriptionValue}</p>
            ))}
            {openSourceValue?.link && (
              <a href={openSourceValue.link}>LINK</a>
            )}
          </li>
        ))}
      </ul>
    </Container>
  ) : null;
};

export default OpenSource;

export const query = graphql`
  fragment OpenSourceData on Opensource {
    title
    data {
      title
      description
      link
    }
  }
`;
