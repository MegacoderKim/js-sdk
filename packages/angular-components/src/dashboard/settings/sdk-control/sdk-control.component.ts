import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {filter, map, switchMap, tap, take} from "rxjs/operators";

@Component({
  selector: 'app-sdk-control',
  templateUrl: './sdk-control.component.html',
  styleUrls: ['./sdk-control.component.less']
})
export class SdkControlComponent implements OnInit {
  @Input() showCustom: boolean = false;
  collectionRules$;
  sdkRules$ = new BehaviorSubject<ISdkControls | null>(null);
  fetch = new Subject();
  loading: boolean = false;
  default = 'realtime';
  modeIndex
  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetch.pipe(
      switchMap(() => this.http.get<ISdkControls>(`app/v1/sdk_config/config/`)),
      tap((sdkControl) => {
          this.default = this.checkMode(sdkControl)
        })
    )
      .subscribe(this.sdkRules$);

    this.fetch.next();
    this.collectionRules$ = this.sdkRules$.pipe(
      filter(data => !!data),
      map((sdkControl) => {
          this.loading = false;
          return {...predicateForm.get(sdkControl, 'collection_rules'), ...predicateForm.get(sdkControl, 'transmission_rules')}
        })
    )
  }

  inputChange() {
    this.cd.detectChanges();
    // console.log(control, value);
  }

  save(control, value) {
    this.loading= true;
    this.sdkRules$.pipe(take(1)).subscribe((sdkRules) => {
      let modsdkRules = {...sdkRules};
      control.chain.reduce((acc, prop, i) => {
        const isLast = control.chain.length  - 1  == i;
        if (isLast) acc[prop] = value;
        return acc[prop]
      }, modsdkRules);
      this.post(modsdkRules);
    })
  };

  post(obj) {
    this.http.patch<ISdkControls>(`app/v1/sdk_config/config/`, obj).subscribe((data) => {
      this.sdkRules$.next(obj);
    })
  }

  checkMode(sdkControl: ISdkControls): 'realtime' | 'battery' | 'custom' {
    const transmissionRule = sdkControl.sdk_config.transmission_rules;
    const predicate = transmissionRule.predicates.find((item, i) => {
      const key = Object.keys(item)[0];
      if(key == "eq,server.state,consumption") {
        this.modeIndex = i;
        return true
      } else {
        return false
      }

    }) ;
    const v = predicate["eq,server.state,consumption"]['result']['batch_duration'];
    if(v == 3) {
      return "realtime"
    } else if(v == 50) {
      return 'battery'
    } else {
      return 'custom'
    }
  };

  selectMode(mode: 'realtime' | 'battery') {
    const chain = ['sdk_config', 'transmission_rules', 'predicates', this.modeIndex, 'eq,server.state,consumption', 'result', 'batch_duration'];
    const value = mode == 'realtime' ? 3 : 50;
    this.save({chain}, value)
  }
};

export const predicateForm = {
  get(sdkControl: ISdkControls, type: 'collection_rules' | 'transmission_rules') {
    const controlType = sdkControl.sdk_config[type];
    const predicates = controlType.predicates;
    const defaultRule = controlType.default_rule;
    return {
      [type]: this.getForm(predicates, defaultRule, type)
    };
    // return list.map((item) => {
    //   return {
    //     label:
    //   }
    // })
  },

  getForm(predicates: IPredicate[], defaultRule: ICollectionPredicate | ITransmissionPredicate, type) {
    const basePath = ['sdk_config']
    const defaultPredicate = {
      label: "Default",
      controls: this.getControls(defaultRule, [...basePath, type, 'default_rule'])
    };
    const predicateForm = predicates.map((predicate: IPredicate, i) => {
      const key = Object.keys(predicate)[0];
      return {
        label: key,
        controls: this.getControls(predicate[key].result, [...basePath, type, 'predicates', i])
      }
    });
    return [defaultPredicate, ...predicateForm]
  },

  getControls(obj: object, path: string[]) {
    return Object.keys(obj).map((key) => {
      const value = ''+obj[key];
      const chain = [...path, key];
      return {key, value, chain}
    })
  }
};

export interface ISdkControls {
  valid: boolean,
  sdk_config: {
    collection_rules: {
      predicates: IPredicate[],
      default_rule: ICollectionPredicate
    },
    transmission_rules: {
      predicates: IPredicate[],
      default_rule: ITransmissionPredicate
    }
  }
}
export interface IPredicate {
  [name: string]: {
    result: ICollectionPredicate | ITransmissionPredicate
  }
}

export interface ICollectionPredicate {
  "location.collection_frequency": number,
  "location.displacement": number,
  "activity.collection_frequency": number,
}

export interface ITransmissionPredicate {
  "batch_duration": number,
  "preferred_channel": string,
  "ttl": number,
  "batch_size": number,
  "flush": boolean
}

export interface ISdkForm {
  name: string;
  results: IPredicate[]
}
