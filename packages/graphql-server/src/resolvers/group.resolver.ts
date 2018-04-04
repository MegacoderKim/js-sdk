import {Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UsersService} from '../services/users.service';
import {toPromise} from 'rxjs/operator/toPromise';
import {tap} from 'rxjs/operators';
import {HMString, DistanceLocale} from "ht-utility"
import {ActionService} from '../services/action.service';
import {GroupsService} from '../services/groups.service';

@Resolver('Group')
export class GroupResolver {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService
  ) {}

  @Query('group')
  async getAuthor(obj, args, context, info) {
    const { id } = args;
    return await this.groupsService.api.get(id, context.token).pipe(
      tap((data) => {
        // console.log(data)
      })
    ).toPromise();
  }

  @ResolveProperty('users')
  async getUser(group, args, context) {
    const query = {
      group_id: group.id,
      ...args
    };
    return await this.usersService.api.index(query, context.token).toPromise()
  }


}