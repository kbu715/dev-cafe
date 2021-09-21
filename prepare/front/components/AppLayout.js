import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Column, Container } from './Grid';
import Navigation from './Nav/GlobalNavigation';
import { GNB_HEIGHT } from '../utils/constant';
import GlobalFooter from './Footer/GlobalFooter';
import HomeBackground from './Home/Background';

const MainContainer = styled.main`
  margin: ${GNB_HEIGHT + 20}px 0;
`;

const AppLayout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= GNB_HEIGHT) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
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
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
