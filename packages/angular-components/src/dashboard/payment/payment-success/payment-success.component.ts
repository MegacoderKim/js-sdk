import { Component, OnInit } from '@angular/core';
import {AccountUsersService} from "../../account/account-users.service";
import {ExternalAnalyticsService} from '../../core/external-analytics.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.less']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private accountUsersService: AccountUsersService,
    private externalAnalyticsService: ExternalAnalyticsService
  ) {}

  confetti() {
    const confettiContainer: Element = document.querySelector('.confetti-container');
    const animationSpeeds = ['slow', 'medium', 'fast'];
    const types = ['round', 'rectangle'];
    let renderInterval = null;
    renderInterval = setInterval(() => {
      const particle = document.createElement('div');

      const particleType = types[Math.floor(Math.random() * types.length)];
      const particleLeft = (Math.floor(Math.random() * confettiContainer['offsetWidth'])) + 'px';
      const particleAnimation = animationSpeeds[Math.floor(Math.random() * animationSpeeds.length)];

      particle.classList.add(
        'confetti__particle',
        `confetti__particle--animation-${particleAnimation}`,
        `confetti__particle--${particleType}`
      );
      particle.style.left = particleLeft;
      particle.style.webkitTransform = `rotate(${Math.floor(Math.random() * 360)}deg)`;

      particle['removeTimeout'] = setTimeout(function() {
        particle.parentNode.removeChild(particle);
      }, 15000);

      confettiContainer.appendChild(particle);
    }, 300);
  }

  ngOnInit() {
    this.accountUsersService.checkAccountUser()
  }

  ngAfterViewInit() {
    this.externalAnalyticsService.logSegmentEvent( 'plan upgraded', 'conversion','payment');
    this.confetti();
  }


}
