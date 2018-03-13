import {Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UsersService} from '../services/users.service';
import {toPromise} from 'rxjs/operator/toPromise';
import {tap} from 'rxjs/operators';
import {PageDataResolver} from './page-data.resolver';
import {GroupsService} from '../services/groups.service';

@Resolver('Groups')
export class GroupsResolver extends PageDataResolver{
  constructor(
    private readonly groupsService: GroupsService,
  ) {
    super();
  }

  @Query('groups')
  async getGroups(obj, args, context, info) {
    const { parent_id } = args;
    // console.log(id);
    return await this.groupsService.api.index().pipe(
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