import { Component, OnInit } from '@angular/core';
const footerLinks = [
  {
  "name" : "Product",
    "items" : [{
      "label" : "Use cases",
      "link" : "/usecases"
    }, {
    "label" : "Building blocks",
      "link" : "/primitives"
    }, {
    "label" : "Technology",
    "link" : "/tech"
    }, {
    "label" : "Pricing",
    "link" : "/pricing"
    }, {
    "label" : "FAQ",
    "link" : "/faq"
  }]
  },
  {
    "name" : "Developers",
    "items" : [{
      "label" : "Documentation",
      "link" : "/docs"
    }, {
      "label" : "Get in touch",
      "link" : "mailto:help@hypertrack.com"
    }, {
      "label" : "Join our slack",
      "link" : "http://slack.hypertrack.com/"
    }]
  },
  {
    "name" : "About",
    "items" : [{
      "label" : "About us",
      "link" : "/team"
    }, {
      "label" : "Team",
      "link" : "/team"
    }, {
      "label" : "We are hiring",
      "link" : "/jobs",
      "isEmphasize" : true
    }, {
      "label" : "Blog",
      "link" : "/blog"
    },{
      "label" : "Terms",
      "link" : "/terms"
    },{
      "label" : "Privacy",
      "link" : "/privacy"
    }]
  }
  ];

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})

export class FooterComponent implements OnInit {
  footerLinks = footerLinks;
  images = {
    logoWhite: require("../../assets/images/logowhite.svg"),
    newLogoWhite: require("../../assets/images/custom/new-logo-white.png"),
    mediumLogo: require("../../assets/images/medium.svg"),
    slackLogo: require("../../assets/images/slack.svg"),
    githubLogo: require("../../assets/images/github.svg"),
    discourseLogo: require("../../assets/images/discourse.svg"),
    facebookLogo: require("../../assets/images/facebook.svg"),
    twitterLogo: require("../../assets/images/twitter.svg"),
    logo : require( '../../assets/images/hypertrack-logo-box-green.svg'),
  };
  constructor() { }
  ngOnInit() {
  }

}
