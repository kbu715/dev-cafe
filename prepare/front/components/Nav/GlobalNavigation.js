import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ThemeContext } from '../../pages/_app';
import DarkModeToggle from '../DarkModeToggle';
import { GNB_HEIGHT, GNB_Z_INDEX } from '../../utils/constant';
import UserMenu from '../UserMenu';
import { Container, Row, Column } from '../Grid';

const NavContainer = styled.nav`
  width: 100%;
  height: ${GNB_HEIGHT}px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${GNB_Z_INDEX};
  color: white;
  background: transparent;
  ${(props) =>
    props.show &&
    css`
      background: ${props.theme.itemBackground};
      color: ${props.theme.text};
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    `};
`;

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${GNB_HEIGHT}px;
`;

const LogoContainer = styled.div`
  width: 200px;
  height: 100%;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const SearchBarContainer = styled.div`
  width: 400px;
  height: 100%;
`;

const NavMenuContainer = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Navigation = ({ show }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavContainer theme={theme} show={show}>
      <Container>
        <Row>
          <Column sm={4} md={12}>
            <ItemsWrapper>
              <LogoContainer theme={theme}>
                <Link href="/">
                  <a>DEV-CAFE</a>
                </Link>
              </LogoContainer>
              <SearchBarContainer />
              <NavMenuContainer>
                <DarkModeToggle />
                <UserMenu />
              </NavMenuContainer>
            </ItemsWrapper>
          </Column>
        </Row>
      </Container>
    </NavContainer>
  );
};

Navigation.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Navigation;
