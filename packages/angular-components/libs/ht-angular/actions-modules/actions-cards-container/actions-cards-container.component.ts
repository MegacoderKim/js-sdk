import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {cardStackFn, shuffle} from "../../common/animations";
import {HtActionsService} from "../../ht/ht-actions.service";
import {summaryAnim} from "../../common/animations";
import {IAction, Page, IUserPlaceline} from "ht-models";

@Component({
  selector: 'ht-actions-cards-container',
  templateUrl: './actions-cards-container.component.html',
  styleUrls: ['./actions-cards-container.component.scss'],
  animations: [
    cardStackFn('ht-action'),
    shuffle,
    summaryAnim
  ]
})
export class ActionsCardsContainerComponent implements OnInit, OnChanges {
  @Output() onSelectAction = new EventEmitter();
  @Output() onHover = new EventEmitter();
  @Input() actionsPage: Page<IAction>;
  @Input() selectedId: string;
  @Input() userPlaceline: IUserPlaceline;
  // data$;
  actions: IAction[];
  constructor(
    // private actionsService: HtActionsService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.actionsPage) {
      if (this.userPlaceline || this.selectedId) {
        this.actions = this.actionsPage.results.reduce((actions, action) => {
          return action.id == this.selectedId ?
            this.userPlaceline ?
              this.userPlaceline.actions.filter((userAction) => {
                return userAction.id == this.selectedId
              }) : [action] : actions
        }, [])
      } else {
        this.actions = this.actionsPage.results;
      }
    }
  }

  ngOnInit() {
    // this.data$ = this.actionsService.list.data$;
  }

  selectAction(action) {
    this.onSelectAction.next(action)
  }

  indexId(index, item) {
    return item.id
  }

  hover(action) {
    this.onHover.next(action)
  }

}
