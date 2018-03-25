import {Query, ResolveProperty, Resolver} from "@nestjs/graphql";
import {tap} from "rxjs/operators";
import {UsersService} from "../services/users.service";

@Resolver('Placeline')
export class PlacelineResolver {

  constructor(private userService: UsersService) {

  }

  @Query('placeline')
  async getPlaceline(obj, args, context, info) {

    const { action_id, user_id, start_time, end_time } = args;
    const query = {
      action_id,
      user_id
    };
    return await this.userService.api.placeline(user_id, query, context.token).pipe(
      tap((data) => {
        // console.log(data, "herer")
      })
    ).toPromise();
  }

  @ResolveProperty('actions')
  getActions(obj, args, context, info) {
    return obj.actions
  }

  @ResolveProperty('user')
  getUser(obj, args, context, info) {
    const user = {...obj, actions: null, events: null, placeline: null};
    delete user.actions;
    delete user.placeline;
    delete user.events;
    return user
  }

  @ResolveProperty('placeline')
  getPlacelineItems(obj, args, context, info) {
    return obj.placeline;
  }

}