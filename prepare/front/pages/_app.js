import PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import { GlobalStyle } from '../global-styles';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>타이틀</title>
      </Head>
      <GlobalStyle />
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);

// withRedux, withReduxSaga ==> HOC
