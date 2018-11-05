// Source code originated from https://github.com/storybooks/storybook/tree/a2a2a914275296f5776b92cd36d45811a5b377d3/addons/info/src/components
import PropTypes from 'prop-types';
import React from 'react';

import { Table, Td, Th } from '@storybook/components';
import PropVal from './PropVal';
import PrettyPropType from './types/PrettyPropType';
import marked from "marked";

export default function PropTable(props) {
  const {
    type,
    maxPropObjectKeys,
    maxPropArrayLength,
    maxPropStringLength,
    propDefinitions,
  } = props;

  if (!type) {
    return null;
  }

  if (!propDefinitions.length) {
    return <small>No propTypes defined!</small>;
  }

  const propValProps = {
    maxPropObjectKeys,
    maxPropArrayLength,
    maxPropStringLength,
  };

  return (
    <Table>
      <thead>
        <tr>
          <Th bordered>property</Th>
          <Th bordered>propType</Th>
          <Th bordered>required</Th>
          <Th bordered>default</Th>
          <Th bordered>description</Th>
        </tr>
      </thead>
      <tbody>
        {propDefinitions.map(row => (
          <tr key={row.property}>
            <Td bordered code>
              {row.property}
            </Td>
            <Td bordered code>
              <PrettyPropType propType={row.propType} />
            </Td>
            <Td bordered>{row.required ? 'yes' : '-'}</Td>
            <Td bordered>
              {row.defaultValue === undefined ? (
                '-'
              ) : (
                <PropVal val={row.defaultValue} {...propValProps} />
              )}
            </Td>
            <Td bordered>
              <div 
                style={{ marginBottom: '-16px', overflow: 'hidden' }} 
                dangerouslySetInnerHTML={{ __html: marked(row.description) }} 
                />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

PropTable.displayName = 'PropTable';
PropTable.defaultProps = {
  type: null,
  propDefinitions: [],
};
PropTable.propTypes = {
  type: PropTypes.func,
  maxPropObjectKeys: PropTypes.number.isRequired,
  maxPropArrayLength: PropTypes.number.isRequired,
  maxPropStringLength: PropTypes.number.isRequired,
  propDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      propType: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      required: PropTypes.bool,
      description: PropTypes.string,
      defaultValue: PropTypes.any,
    })
  ),
};
