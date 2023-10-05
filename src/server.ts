import 'dotenv/config';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolver';
import App from './index';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
validateEnv()

const app = new App(typeDefs, resolvers, Number(process.env.PORT))


app.listen()