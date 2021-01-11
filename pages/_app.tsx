import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo';
import Head from 'next/head';
import './app.css'
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [media, setMedia] = useState('print');

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&family=EB+Garamond:wght@400&display=swap" />

        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&family=EB+Garamond:wght@400&display=swap"
          media={media} onLoad={ () =>setMedia('all')} />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
