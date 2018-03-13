import {Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UsersService} from '../services/users.service';
import {toPromise} from 'rxjs/operator/toPromise';
import {tap} from 'rxjs/operators';
import {HMString} from "ht-utility"
import {ActionService} from '../services/action.service';
import {PageDataResolver} from './page-data.resolver';
@Resolver('Actions')
export abstract class ActionsResolver extends PageDataResolver{
  constructor(
    private readonly actionService: ActionService,
  ) {
    super()
  }

  @Query('actions')
  async getAuthor(obj, args, context, info) {
    return await this.actionService.api.index(args).pipe(
      tap((data) => {
        // console.log(data)
      })
    ).toPromise();
  }

};
