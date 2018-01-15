import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {pluck} from "rxjs/operators";

@Component({
  selector: 'ht-test-placeline',
  templateUrl: './test-placeline.component.html',
  styleUrls: ['./test-placeline.component.scss']
})
export class TestPlacelineComponent implements OnInit {
  userId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(
      pluck('id')
    ).subscribe((id: string) => {
      this.userId = id;
    })
  }

}
