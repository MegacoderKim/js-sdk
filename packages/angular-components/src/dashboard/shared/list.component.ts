import {Component} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {BroadcastService} from "../core/broadcast.service";
import {IPageData, IFilter} from "../model/common";
import {merge} from "rxjs/observable/merge";

@Component({
    template: ''
})
export class ListComponent {
    subs: Subscription[] = [];
    listData$;
    listData: IPageData;
    fetchingNext: boolean = false;
    newData: number = 0;
    hasData: boolean = false;
    baseLoading = {
        data: true,
        page: false,
        new: false,
    };
    constructor(public broadcast: BroadcastService) {

    }

    ngOnInit() {
        this.initCommonListeners()
    }

    ngOnDestroy() {
        _.map(this.subs, sub => sub.unsubscribe())
    }

    private initCommonListeners() {

        this.listData$ = this.listFilter$()
            .switchMap((query) => {
                return this.getList$(query).catch(() => Observable.of(null))
            }).do((data: IPageData) => {
                if(data) {
                    if(this.fetchingNext) {
                        let results = [...this.listData.results, ...data.results];
                        this.listData = {...data, results: results}
                    } else {
                        this.listData = data;
                    }
                    console.log(this.listData);
                    this.baseLoading.data = false;
                    this.baseLoading.new = false;
                    this.baseLoading.page = false;
                    this.fetchingNext = false;
                    this.broadcast.emit('list-update');
                    // if(this.hasData) {
                    //     this.updateList(data);
                    //     this.checkNew(this.listData.results)
                    // } else {
                    //     this.hasData = true;
                    // }
                }

        });

        this.fillUpdate()

    }

    private listFilter$(): Observable<Object> {
        // let filter$ = Observable.combineLatest(
        //     this.listQuery()
        // );
        return merge(
            // this.regularUpdate$().filter(() => !this.fetchingNext),
            this.fetchNextFilter().do((filter) => {
                this.fetchingNext = true;
                console.log("next", filter);
            }),
            this.resetUpdate$(),
            this.filter$().map((filter: IFilter) => filter.query).do(() => this.resetListState()),
            // this.fillUpdate$()
        )
    }

    filter$(): Observable<Object> {
        //filter query observable
        return Observable.of({})
    }

    private toUpdate$() {
        return this.broadcast.on('list-update').debounceTime(10000)
    }

    private regularUpdate$() {
        return this.toUpdate$()
            // .takeUntil(this.broadcast.on('list-reset'))
            .do(() =>{
                // console.log("got emit");
                this.updateList();
                this.checkNew(this.listData.results);
            }).switchMap(() => {
            let list = this.listData;
            if(list && list.results && list.results.length > 0) {
                let idsArray = list.results.reduce((acc: string[][], item) => {
                    let currentLength = _.last(acc).length;
                    if(currentLength > 14) {
                        return [...acc, [item.id]]
                    } else {
                        let last = [...acc.pop(), item.id];
                        return [...acc, last]
                    }
                }, [[]]);
                let callArray$ = idsArray.map((ids) => {
                    return this.filter$().take(1)
                        .switchMap((filter: IFilter) => {
                            let statusParam = filter.statusParam || 'status';
                            let query = {...filter.query, id: ids.toString(), page_size: list.results.length, [statusParam]: null};
                            // console.log(query);
                            return this.getList$(query).catch(() => Observable.of(null))
                        })
                });

                // console.log(idsArray, "array");
                return merge(...callArray$)

            } else {
                return this.filter$().take(1).map((filter: IFilter) => filter.query).switchMap((query) => {
                    return this.getList$(query).catch(() => Observable.of(null))
                })
            }
        });

    }

    private resetUpdate$() {
        return this.broadcast.on('list-reset').switchMap(() => {
            return this.filter$().take(1).map((filter: IFilter) => filter.query)
        });
    }

    getList$(query): Observable<IPageData> {
        //get list index observable. e.g this.http.get('item')
        return Observable.empty()
    }

    fetchNextQuery() {
        //fetch next params
        return {}
    }

    private fetchNextFilter() {
        return this.broadcast.onScrollEnd().throttleTime(500).filter(() => !!this.listData)
            .switchMap(() => {
                this.baseLoading.page = true;
                let lastItem = this.lastItem();
                if(!lastItem) {
                    return this.filter$().take(1).map((filter: IFilter) => filter.query);
                } else {
                    return this.filter$().take(1).map((filter: IFilter) => {
                        return {...filter.query, ...filter.nextSetQuery(lastItem)}
                    })
                }

            })

    }

    private lastItem() {
        return _.last(this.listData.results)
    }

    private checkNew(items: any[]) {
        if(items && items.length) {
            this.filter$().take(1)
                .switchMap((filter: IFilter) => {
                let query = {...filter.query, ...filter.newSetQuery(items[0]), page_size: 1};
                return this.getList$(query).catch(() => Observable.of(null))
            })
                .takeUntil(this.broadcast.on('list-reset'))
                .subscribe((newData: IPageData) => {
                if(newData) this.newData = newData.count;
                this.broadcast.emit('list-update')
            });
        }


    }

    getNewData() {
        //click listner for resting data
        this.resetListState();
        this.broadcast.emit('list-reset');
        this.broadcast.emit('list-update');
        this.baseLoading.new = true;
        this.fillUpdate()
    }

    updateList() {
        //runs after fist update
    }

    private resetListState() {
        this.hasData = false;
        this.newData = 0;
    }

    private clearFilter(oldfilter: IFilter) {
        let filter = {...oldfilter};
        let statusParam = filter.statusParam || 'status';
        if(filter.query[statusParam]) delete filter.query[statusParam];
        return filter
    }

    private fillUpdate() {
        let sub = this.regularUpdate$()
            .takeUntil(this.broadcast.on('list-reset'))
            .filter(data => !!data).subscribe((data: IPageData) => {
                this.baseLoading.new = false;
                if(this.listData && this.listData.results.length) {
                    let updateResults = _.indexBy(data.results, 'id');
                    let results = _.map(this.listData.results, (item) => {
                        return updateResults[item.id] || item
                    });
                    this.listData = {...this.listData, results: results}
                } else {
                    this.listData = data
                }

        });

        this.subs.push(sub)
    }

    indexId(index, item){
        return item.id
    }
}
