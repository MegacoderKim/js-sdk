import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { AppController } from './app.controller';
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';
import {buildSchema} from 'graphql';
import {ApiService} from './services/api.service';
import {UsersService} from './services/users.service';
import {UsersResolver} from './resolvers/users.resolver';
import {ActionService} from './services/action.service';
import {ActionsResolver} from './resolvers/actions.resolver';
import {ActionResolver} from './resolvers/action.resolver';
import {UserResolver} from './resolvers/user.resolver';
import {GroupsService} from './services/groups.service';
import {GroupResolver} from './resolvers/group.resolver';
import {GroupsResolver} from './resolvers/groups.resolver';
import {LoggerMiddleware} from "./middlewares/logger.middleware";

@Module({
  imports: [GraphQLModule],
  controllers: [AppController],
  components: [
    ApiService,
    UsersService,
    UserResolver,
    UsersResolver,
    ActionService,
    ActionsResolver,
    ActionResolver,
    GroupsService,
    GroupResolver,
    GroupsResolver
  ],
})
export class ApplicationModule implements NestModule {

  constructor(
    private readonly graphQLFactory: GraphQLFactory,
    private readonly apiService: ApiService,
    private readonly usersService: UsersService,
    private readonly actionsService: ActionService,
    private readonly groupsService: GroupsService,
  ) {}

  configure(consumer: MiddlewaresConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL })
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes({ path: '/graphiql', method: RequestMethod.GET })
      .apply(graphqlExpress((req) => {
        return {
          schema,
          context: {
            token: req.token,
            actionsLoader: this.actionsService.createLoader(req.token),
            usersLoader: this.usersService.createLoader(req.token),
            groupsLoader: this.groupsService.createLoader(req.token)
          }
        }
        // console.log(req.headers.authorization);

      }))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
