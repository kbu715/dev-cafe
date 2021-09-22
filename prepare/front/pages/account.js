import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import AppLayout from '../components/AppLayout';

const AccountContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const Account = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | DEV-CAFE</title>
      </Head>
      <AppLayout>
        <AccountContainer>내 계정</AccountContainer>
      </AppLayout>
    </>
  );
};

export default Account;
