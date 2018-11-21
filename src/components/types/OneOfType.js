import React from 'react';

import PrettyPropType from './PrettyPropType';
import { TypeInfo, getPropTypes } from './proptypes';

const OneOfType = ({ propType }) => {
  const propTypes = getPropTypes(propType);
  return (
    <span>
      {propTypes
        .map((value, i) => {
          return [
            <PrettyPropType key={i} propType={value} />,
            i < propTypes.length - 1 ? <span key={`${i}-separator`}> | </span> : null,
          ];
        })
        .reduce((acc, tuple) => acc.concat(tuple), [])}
    </span>
  );
};
OneOfType.propTypes = {
  propType: TypeInfo.isRequired,
};
export default OneOfType;
