import { Component, OnInit } from '@angular/core';
import {BroadcastService} from "../../core/broadcast.service";
import {Subject} from "rxjs/Subject";
import * as _ from "underscore";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {HttpClient} from "@angular/common/http";
import {Page} from "ht-models";
@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.less']
})
export class InvitationListComponent implements OnInit {
  openInvitation: boolean = false;
  getInvite: Subject<boolean> = new Subject();
  invitations$;
  removeLoadingIndex: number =  -1;
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.initListener();
  }

  getInvites() {
    this.getInvite.next(true)
  }

  private initListener() {
    this.invitations$ = this.getInvite.startWith(true).switchMap(() => this.fetchUserInvites()).map((data) => {
      let accepted = _.filter(data.results, (invite: IUserInvites) => {
        return invite.status == 'accepted'
      }).length;
      this.removeLoadingIndex = -1;
      return {...data, accepted}
    })
  }

  private fetchUserInvites() {
    return this.http.get<Page<IUserInvites>>('app/v1/user_invites/')
  }

  setOpenInvitation(open: boolean) {
    console.log(open);
    this.openInvitation = open
  }

  removeInvite(id, i: number) {
    this.removeLoadingIndex = i;
    this.http.delete(`app/v1/user_invites/${id}/`).subscribe(data => {
      console.log(data);
      this.getInvites();
      this.snackbarService.displaySuccessToast('Invitaion was deleted')
    }, err => {
      this.snackbarService.displayErrorToast('Something went wrong!')
      this.removeLoadingIndex = -1;
    })
  }
}

interface IUserInvites {
  id: string,
  status: 'accepted' | 'rejected' | 'message_sent',
  phone: number,
  user_id: string,
}
