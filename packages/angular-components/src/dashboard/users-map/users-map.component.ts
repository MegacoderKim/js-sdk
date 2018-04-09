import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import {UserService} from "../users/user.service";

@Component({
  selector: 'app-users-map',
  templateUrl: './users-map.component.html',
  styleUrls: ['./users-map.component.scss']
})
export class UsersMapComponent implements OnInit {
  userId: string | null = null;
  query: object;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.query = this.userService.getQueryFromRoute(this.route.snapshot.params);

    this.userService.getQueryForRoute().subscribe((query) => {
      this.router.navigate([query], {relativeTo: this.route})
    })

  }

}
