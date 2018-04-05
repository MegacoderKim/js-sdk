import { Component, OnInit } from '@angular/core';
import {ExternalAnalyticsService} from "../services/external-analytics.service";
import {ModalService} from "../services/modal.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  images = {
    logo: require("../../assets/images/logo.svg"),
    newLogo: require("../../assets/images/custom/new-logo-green.svg")
  };
  mobileNavOpen = false;
  constructor(
    private router: Router,
    private externalAnalyticsService: ExternalAnalyticsService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if ( event instanceof NavigationEnd ) {
        this.mobileNavOpen = false;
        window.scrollTo(0, 0);
      }
    })
  }

  handleTopNavClick(option) {
    if (option === 'signup') {
      this.modalService.open('signupModal');
    }
  }

  toggleMobileNav() {
    if ( this.mobileNavOpen == true ) {
      this.mobileNavOpen = false;
    } else {
      this.mobileNavOpen = true;
    }
  }
}
