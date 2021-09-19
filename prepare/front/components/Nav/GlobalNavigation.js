import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../pages/_app';
import DarkModeToggle from '../DarkModeToggle';
import { GNB_HEIGHT, GNB_Z_INDEX } from '../../utils/constant';

const NavContainer = styled.nav`
  width: 100vw;
  height: ${GNB_HEIGHT}px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${GNB_Z_INDEX};
  background: ${(props) => props.themeProps.itemBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
`;

const Navigation = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavContainer themeProps={theme}>
      <DarkModeToggle />
    </NavContainer>
  );
};

export default Navigation;
