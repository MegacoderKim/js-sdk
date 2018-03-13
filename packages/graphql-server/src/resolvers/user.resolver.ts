import {Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UsersService} from '../services/users.service';
import {toPromise} from 'rxjs/operator/toPromise';
import {tap} from 'rxjs/operators';
import {HMString} from "ht-utility";
import {PageResults$} from "ht-data";
import {GroupsService} from '../services/groups.service';
import {ActionService} from '../services/action.service';
@Resolver('User')
export class UserResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly actionsService: ActionService
  ) {}

  @Query('user')
  async getAuthor(obj, args, context, info) {
    const { id } = args;
    // console.log(id);
    return await this.usersService.api.get(id).pipe(
      tap((data) => {
        console.log(data)
      })
    ).toPromise();
  }

  @ResolveProperty('last_update')
  getRecorded(user) {
    const diff = new Date(new Date().getTime() - new Date(user.last_heartbeat_at).getTime()).getTime() / 1000
    return HMString(diff, 60);
  }

  @ResolveProperty('group')
  async getGroup(user, args, context) {
    return user.group_id ?
      await context.groupsLoader.load(user.group_id) : null
  }

  @ResolveProperty('pending_actions')
  async getPendingActions(user) {
    const query = {
      status: 'assigned,started',
      ordering: '-assigned_at',
      user_id: user.id,
      page_size: 50
    };
    return await this.actionsService.api.index(query).pipe(
      PageResults$
    ).toPromise()
  }

}