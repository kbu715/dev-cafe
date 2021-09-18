import React from 'react';
import PropTypes from 'prop-types';
import { StyledColumn } from './styles';

export const Column = ({ sm, md, lg = md, children }) => {
  return (
    <StyledColumn sm={sm} md={md} lg={lg}>
      {children}
    </StyledColumn>
  );
};

Column.propTypes = {
  sm: PropTypes.number.isRequired,
  md: PropTypes.number,
  lg: PropTypes.number,
  children: PropTypes.node,
};
