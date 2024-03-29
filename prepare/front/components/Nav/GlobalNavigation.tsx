import React, { useContext, useState, VFC } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ThemeContext } from '../../pages/_app';
import DarkModeToggle from '../DarkModeToggle';
import { GNB_HEIGHT, GNB_Z_INDEX } from '../../utils/constant';
import UserMenu from '../UserMenu';
import { Container, Row, Column } from '../Grid';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import NavSearch from './NavSearch';

const NavContainer = styled.nav<NavagationProps>`
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

const LogoContainer = styled.div<NavagationProps>`
  width: 35%;
  height: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-family: 'Comfortaa', cursive;
  & a {
    color: white;
    ${(props) =>
      props.show &&
      css`
        color: ${props.theme.text};
      `};

    @media screen and (max-width: 450px) {
      font-size: 13px;
    }
  }

  & span {
    @media screen and (max-width: 450px) {
      display: inline-block;
    }
  }
`;

const SearchBarContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavMenuContainer = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type NavagationProps = {
  show: boolean;
};

const Navigation: VFC<NavagationProps> = ({ show }) => {
  const { theme } = useContext(ThemeContext);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const toggleSignIn: () => void = () => setSignIn((prev) => !prev);
  const toggleSignUp: () => void = () => setSignUp((prev) => !prev);
  return (
    <>
      <NavContainer theme={theme} show={show}>
        <Container>
          <Row>
            <Column sm={4} md={12}>
              <ItemsWrapper>
                <LogoContainer theme={theme} show={show}>
                  <Link href="/">
                    <div>
                      <a>DEV-CAFE</a>
                    </div>
                  </Link>
                </LogoContainer>
                <SearchBarContainer>
                  <NavSearch show={show} />
                </SearchBarContainer>
                <NavMenuContainer>
                  <DarkModeToggle />
                  <UserMenu toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp} />
                </NavMenuContainer>
              </ItemsWrapper>
            </Column>
          </Row>
        </Container>
      </NavContainer>
      {signIn && <SignIn toggleSignIn={toggleSignIn} />}
      {signUp && <SignUp toggleSignUp={toggleSignUp} />}
    </>
  );
};

Navigation.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Navigation;
