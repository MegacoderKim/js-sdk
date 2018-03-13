import {Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UsersService} from '../services/users.service';
import {toPromise} from 'rxjs/operator/toPromise';
import {tap} from 'rxjs/operators';
import {PageDataResolver} from './page-data.resolver';
// import {HMString} from "ht-utility"
@Resolver('Users')
export class UsersResolver extends PageDataResolver{
  constructor(
    private readonly usersService: UsersService,
  ) {
    super();
  }

  @Query('users')
  async getAuthor(obj, args, context, info) {
    // const { id } = args;
    // console.log(obj);
    return await this.usersService.api.index(args).pipe(
      tap((data) => {
        // console.log(data)
      })
    ).toPromise();
  }

  // @ResolveProperty('last_update')
  // async getRecorded(user) {
  //   const diff = new Date(new Date().getTime() - new Date(user.last_heartbeat_at).getTime()).getTime() / 1000
  //   return HMString(diff, 60)
  // }

}