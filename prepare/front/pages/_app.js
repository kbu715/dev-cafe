import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import { GlobalStyle } from '../global-styles';
import { useDarkMode } from '../hooks/useDarkMode';
import { lightTheme, darkTheme } from '../theme';

export const ThemeContext = createContext({
  theme: darkTheme,
  setTheme: () => {},
});

const App = ({ Component }) => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Head>
        <meta charSet="utf-8" />
        <title>타이틀</title>
      </Head>
      <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
      <Component />
    </ThemeContext.Provider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);

// withRedux, withReduxSaga ==> HOC
