import * as React from 'react';
import { graphql } from 'gatsby';
import SectionTitle from '~/src/components/SectionTitle';
import { FieldError } from '~/src/utils';

type EtcProp = {
  data: GatsbyTypes.EtcDataFragment;
};

const Etc: React.FC<EtcProp> = ({ data }) => {
  const { title, data: etcData } = data;
  if (!title) {
    throw new FieldError({ componentName: 'Etc', field: 'title' });
  }
  return etcData.length > 0 ? (
    <div>
      <SectionTitle title={title} />
      <ul>
        {etcData.map((etcValue, valueIdx) => (
          <li key={`etc-value-${valueIdx}`}>
            <h3>{etcValue?.title}</h3>
            <p>{etcValue?.startDate} ~ {etcValue?.endDate}</p>
            {etcValue?.description && (
              <ul>
                {etcValue.description.map((description, idx) => (
                  <li key={`etc-value-description-${idx}`}>
                    {description}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Etc;

export const query = graphql`
  fragment EtcData on Etc {
    title
    data {
      title
      startDate
      endDate
      description
    }
  }
`;
