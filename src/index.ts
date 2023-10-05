import { ApolloServer} from '@apollo/server';
import { connect, ConnectOptions } from 'mongoose'
import { expressMiddleware } from '@apollo/server/express4';
import express, { Application, Response, Request } from 'express';
import http from 'http';
import cors from 'cors';


/**
 * App - express, mongodb and apollo server initialization
 */
class App {

  public app:Application
  public port: number
  public server: ApolloServer
  public httpServer

  constructor(typeDefs: string, resolvers: any, port: number) {
    this.port = port;
    this.app = express()

    this.initializeDB()

    this.server = new ApolloServer({typeDefs, resolvers})
    this.httpServer = http.createServer(this.app);

    this.initMiddleware()
    this.routes()
  }

  // initialize apollo server middleware
  private async initMiddleware() {
    await this.server.start();
    this.app.use(
      '/',
      cors(),
      express.json(),
      expressMiddleware(this.server, {
        context: async ({ req }) => ({ token: req.headers.token }),
      }),
    );
  }

  private routes() {
    this.app.get("/test", (req:Request, res: Response) => {
      res.send("hello")
    })
  }


  //init database
  private initializeDB () {
    type ConnectionOptionsExtend = {
      useNewUrlParser: boolean
      useUnifiedTopology: boolean
    }
    const connectionOptions:ConnectOptions & ConnectionOptionsExtend = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    let url = `${process.env.DATABASE_URL}`
    if(process.env.NODE_ENV == 'production') {
      url = `${process.env.DATABASE}`
    }
    connect(url, connectionOptions).then(() => {
      console.log('Database Connected Successfully')
    })
  }

  
  public async listen() {
    await this.httpServer.listen({port: this.port})
    console.log(`🚀  Server ready at: ${this.port}`);

    
  }
}

export default App