import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Column, Container } from './Grid';
import Navigation from './Nav/GlobalNavigation';
import { GNB_HEIGHT } from '../utils/constant';
import GlobalFooter from './Footer/GlobalFooter';
import HomeBackground from './Home/Background';
import ScrollToTopButton from './Home/ScrollToTopButton';

const Wrapper = styled.div`
  position: relative;
`;

const MainContainer = styled.main`
  margin: ${GNB_HEIGHT + 20}px 0;
`;

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [showNav, setShowNav] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= GNB_HEIGHT) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <Wrapper>
      <Navigation show={showNav} />
      <HomeBackground />
      <MainContainer>
        <Container>
          <Row>
            <Column sm={4} md={1} />
            <Column sm={4} md={8}>
              {children}
            </Column>
            <Column sm={4} md={1} />
          </Row>
        </Container>
      </MainContainer>
      <ScrollToTopButton />
      <GlobalFooter />
    </Wrapper>
  );
};

export default AppLayout;
