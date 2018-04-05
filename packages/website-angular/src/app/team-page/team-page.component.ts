import { Component, OnInit } from '@angular/core';

require('../../assets/js/webflow/webflow.js');

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.less']
})
export class TeamPageComponent implements OnInit {
  images = {
    ashish: require('../../assets/images/Artboard_1.png'),
    naren: require('../../assets/images/naren.png'),
    kevin: require('../../assets/images/kevin.png'),
    meena: require('../../assets/images/Group.png'),
    ankur: require('../../assets/images/team/ankur.jpg'),
    gunjan: require('../../assets/images/team/gunjan.png'),
    nilesh: require('../../assets/images/team/nilesh.png'),
    prajakt: require('../../assets/images/team/prajakt.png'),
    arjun: require('../../assets/images/team/arjun.png'),
    kashyap: require('../../assets/images/team/Kashyap.png'),
    piyush: require('../../assets/images/team/Piyush.png'),
    amit: require('../../assets/images/team/Amit.png'),
    gaurav: require('../../assets/images/team/Gomu.png'),
    ravi: require('../../assets/images/team/Ravi.png'),
    seb: require('../../assets/images/team/Seb.png'),
    utkarsh: require('../../assets/images/team/Utkarsh.png'),
    vibhas: require('../../assets/images/team/Vibhas.png'),
    abhishek: require('../../assets/images/team/Abhishek.png'),
    rishabh: require('../../assets/images/team/Rishabh.png'),
    aman: require('../../assets/images/team/Aman.png'),
    atul: require('../../assets/images/team/atul.jpg'),
  };
  constructor() { }

  ngOnInit() {
  }

}
