import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-redirect-component',
  templateUrl: './redirect-component.component.html',
  styleUrls: ['./redirect-component.component.less']
})
export class RedirectComponentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    switch (this.router.routerState.snapshot.url) {
      case '/signup':
        window.location.href = 'https://dashboard.hypertrack.com/signup';
        break;
      case '/login':
        window.location.href = 'https://dashboard.hypertrack.com/login';
        break;
      default:
        window.location.href = 'https://www.hypertrack.com';
    }
  }

}
