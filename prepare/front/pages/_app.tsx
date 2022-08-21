import React, { createContext, useRef } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import { GlobalStyle } from '../global-styles';
import { useDarkMode } from '../hooks/useDarkMode';
import { lightTheme, darkTheme, ThemeType } from '../theme';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

type ContextState = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ContextState>({
  theme: darkTheme,
  toggleTheme: () => {},
});

const App = ({ Component, pageProps }: AppProps) => {
  const { theme, toggleTheme } = useDarkMode();
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta charSet="utf-8" />
            <title>DEV-CAFE</title>
          </Head>
          <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
          <Component />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeContext.Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(App);
