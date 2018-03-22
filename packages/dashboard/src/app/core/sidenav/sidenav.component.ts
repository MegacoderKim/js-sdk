import {Component, OnInit} from "@angular/core";
import {Router, NavigationEnd, ActivatedRoute} from "@angular/router";
import {config} from "../../config";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent implements OnInit {
  show = {
    users: false,
    actions: false,
    settings: false,
    quickstart: false,
  };
  isDemo: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.isDemo = config.isDemo;
    this.router.events.filter(e => e instanceof NavigationEnd).subscribe(data => {
        // console.log(data);
        this.initShow()
      });
  }

  private initShow() {
    this.show = {
      users: false,
      actions: false,
      settings: false,
      quickstart: false
    };
  }
}
