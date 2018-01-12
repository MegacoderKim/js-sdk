import { OnInit } from '@angular/core';
import { SnackbarService } from "./snackbar.service";
export declare class SnackbarComponent implements OnInit {
    snackbarService: SnackbarService;
    constructor(snackbarService: SnackbarService);
    ngOnInit(): void;
}
