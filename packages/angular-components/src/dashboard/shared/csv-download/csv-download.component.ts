import { Component, OnInit, Input, Output } from '@angular/core';
import {HtQuerySerialize} from "ht-utility";
import {take, flatMap} from "rxjs/operators";
var download = require('../../../assets/download.js');
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-csv-download',
  templateUrl: './csv-download.component.html',
  styleUrls: ['./csv-download.component.scss']
})
export class CsvDownloadComponent implements OnInit {
  downloadLoading: boolean = false;
  @Input() client: any;
  @Input() api: string;
  @Input() filename: string;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }
  downloadCsv() {
    this.downloadLoading = true;
    this.client.getApiQuery$().pipe(
      take(1),
      flatMap((query: any) => this.csvApi$(query))
    )
      .subscribe((data) => {
        this.downloadLoading = false;
        download(data, this.filename, "text/csv")
      })
  }

  csvApi$(query) {
    let string = HtQuerySerialize({...query, output_format: 'csv', page_size: null});
    let url = `https://api.hypertrack.com/api/${this.api}?${string}`;
    return this.http.get(url, {responseType: 'text'})
  }
}
