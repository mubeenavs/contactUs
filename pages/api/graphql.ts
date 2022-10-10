import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { appTypeDefs } from '../../api/appTypeDefs';
import { appResolvers } from '../../api/appResolvers'; 
const apolloServer = new ApolloServer({
  typeDefs: appTypeDefs,
  resolvers: appResolvers,
  context(ctx) {
    return ctx;
  },
});
const startServer = apolloServer.start();
const cors = Cors({ origin: 'https://studio.apollographql.com' });
export const config = {
  api: {
    bodyParser: false,
  },
};
export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});