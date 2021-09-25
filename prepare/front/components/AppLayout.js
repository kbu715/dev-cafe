import React, { useLayoutEffect, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Column, Container } from './Grid';
import Navigation from './Nav/GlobalNavigation';
import { GNB_HEIGHT, SCROLLTOTOPBTN_Z_INDEX_ACTIVE, SCROLLTOTOPBTN_Z_INDEX_INACTIVE } from '../utils/constant';
import GlobalFooter from './Footer/GlobalFooter';
import HomeBackground from './Home/Background';
import { ThemeContext } from '../pages/_app';

const Wrapper = styled.div`
  position: relative;
`;

const ScrollTopBtn = styled.button`
  position: fixed;
  opacity: ${({ btnStatus }) => (btnStatus ? 1 : 0)};
  bottom: 80px;
  right: 40px;
  z-index: ${({ btnStatus }) => (btnStatus ? SCROLLTOTOPBTN_Z_INDEX_ACTIVE : SCROLLTOTOPBTN_Z_INDEX_INACTIVE)};
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: ${({ theme }) => theme.itemBackground};
  color: ${({ theme }) => theme.mainColor};
  border: 2px solid ${({ theme }) => theme.mainColor};
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.06em;
  cursor: pointer;
  transition: opacity 0.3s ease-in;

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }

  @media screen and (max-width: 450px) {
    bottom: 50px;
    right: 20px;
  }
`;

const MainContainer = styled.main`
  margin: ${GNB_HEIGHT + 20}px 0;
`;

const AppLayout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const [showNav, setShowNav] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false);

  const handleScrollBtn = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 2000) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setBtnStatus(false);
  };

  const handleScroll = () => {
    if (window.scrollY >= GNB_HEIGHT) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleScrollBtn);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleScrollBtn);
    };
  });

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <Wrapper>
      <Navigation show={showNav} />
      <Container>
        <Row>
          <Column sm={4} md={12}>
            <HomeBackground />
          </Column>
        </Row>
      </Container>
      <MainContainer>
        <Container>
          <Row>
            <Column sm={4} md={3} />
            <Column sm={4} md={6}>
              {children}
            </Column>
          </Row>
        </Container>
      </MainContainer>
      <GlobalFooter />
      <ScrollTopBtn btnStatus={btnStatus} onClick={scrollToTop} theme={theme}>
        Top
      </ScrollTopBtn>
    </Wrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
