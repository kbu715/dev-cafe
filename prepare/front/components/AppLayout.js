import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
// import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
// import { Menu, Input } from 'antd';
import styled from 'styled-components';
import { Row, Column, Container } from './Grid';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import Navigation from './Nav/GlobalNavigation';
import { GNB_HEIGHT } from '../utils/constant';

// const Global = createGlobalStyle`
//   .ant-row {
//     margin-right: 0 !important;
//     margin-left: 0 !important;
//   }

//   .ant-col:first-child {
//     padding-left: 0 !important;
//   }

//   .ant-col:last-child {
//     padding-right: 0 !important;
//   }
// `;

// const SearchInput = styled(Input.Search)`
//   vertical-align: middle;
// `;

const MainContainer = styled.main`
  margin-top: ${GNB_HEIGHT + 20}px;
`;

const AppLayout = ({ children }) => {
  // if isLoggedIn changes, AppLayout Component will be re-rendered on its own.
  const { me } = useSelector((state) => state.user);

  return (
    <>
      {/* <Global /> */}

      {/* <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>홈</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
        <Menu.Item key="toggle">
          <DarkModeToggle />
        </Menu.Item>
      </Menu> */}
      <Navigation />

      <MainContainer>
        <Container>
          <Row>
            <Column sm={4} md={3}>
              {me ? <UserProfile /> : <LoginForm />}
            </Column>
            <Column sm={4} md={6}>
              {children}
            </Column>
          </Row>
        </Container>
      </MainContainer>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
