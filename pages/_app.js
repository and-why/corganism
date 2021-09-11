import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import client from 'config/apollo-client';

const theme = {
  html: {
    fontFamily: 'Inter',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
