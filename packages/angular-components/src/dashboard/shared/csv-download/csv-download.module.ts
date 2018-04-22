import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvDownloadComponent } from './csv-download.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CsvDownloadComponent],
  exports: [CsvDownloadComponent]
})
export class CsvDownloadModule { }
