import React from 'react';
import PropTypes from 'prop-types';
import { StyledContainer } from './styles';

export const Container = ({ children, className }) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
