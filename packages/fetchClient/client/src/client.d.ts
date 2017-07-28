import 'rxjs/add/observable/of';
export declare class HtClient {
    private token;
    actions: any;
    constructor(token: string);
    initEntities(token: any): void;
}
