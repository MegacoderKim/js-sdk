import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {environment} from "../../../environments/environment";
import {config} from "../../config";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  @Input() selected: boolean;
  @Input() hoverLoading: boolean;
  @Input() hasDriver: boolean;
  @Output() select: EventEmitter<boolean> = new EventEmitter();
  isWidget: boolean = config.isWidget;
  baseUrl: string = config.isWidget ? '../' : './';
  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.isWidget = environment.isWidget
  }

  @HostListener('click', ['$event'])
  selectCard(event) {
    if(!this.selected) {
      if (config.isMobile ) {
        this.router.navigate(this.link, {relativeTo: this.route, queryParamsHandling: 'preserve'})
      } else {
        this.select.next(true)

      }
    } else {
      this.select.next(false)
    }
  }

  openLink(event) {
    event.stopPropagation();
    return false;
  }

  get link() {
    return [this.baseUrl, {}]
  }

}
