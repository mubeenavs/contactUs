import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/contactUs/contactus.css';
import '../styles/responsive.css';
import '../themes/components/PEGButton.css';
import '../styles/globals.css';
import {useApollo} from '../utils/apolloGraphql';
import {ApolloProvider} from '@apollo/client';
function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo((pageProps as any).initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
    <Component {...pageProps} />
  </ApolloProvider>
  )
  
}

export default MyApp
