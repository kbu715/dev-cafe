import React from 'react';
import PropTypes from 'prop-types';
import { StyledRow } from './styles';

export const Row = ({ alignItems, children, className, justifyContent }) => {
  return (
    <StyledRow className={className} justifyContent={justifyContent} alignItems={alignItems}>
      {children}
    </StyledRow>
  );
};

Row.propTypes = {
  alignItems: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  justifyContent: PropTypes.string,
};
