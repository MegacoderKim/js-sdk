import {Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UsersService} from '../services/users.service';
import {tap} from 'rxjs/operators';
import {DistanceLocale} from "ht-utility"
import {ActionService} from '../services/action.service';
@Resolver('Action')
export class ActionResolver {
  constructor(
    private readonly actionService: ActionService,
    private readonly usersService: UsersService
  ) {}

  @Query('action')
  async getAuthor(obj, args, context, info) {
    const { id } = args;
    // console.log(id);
    return await this.actionService.api.get(id, context.token).pipe(
      tap((data) => {
        // console.log(data)
      })
    ).toPromise();
  }

  @ResolveProperty('user')
  async getUser(action, args, context) {
    return await context.usersLoader.load(action.user.id)
  }
  @ResolveProperty('distance_string')
  getDistance(action, args) {
    const { unit } = args;
    const timeZone = (unit || action.display.distance_unit) === 'km' ? 'asd' : "America";
    return DistanceLocale(action.distance, timeZone);
  }


}