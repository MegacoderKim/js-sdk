export declare class SnackbarService {
    showErrorToast: Boolean;
    showSuccessToast: Boolean;
    successMessage: String;
    loadingMessage: string;
    errorMessage: String;
    hideErrorToastTimer: any;
    hideSuccessToastTimer: any;
    showLoadingToast: boolean;
    constructor();
    displayErrorToast(errorMessage: string): void;
    hideErrorToast(): void;
    displaySuccessToast(successMessage: string): void;
    displayLoadingToast(string?: string): void;
    hideLoadingToast(): void;
    hideSuccessToast(): void;
}
