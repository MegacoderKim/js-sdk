import * as _ from "underscore";
import {QueryLabel} from "../interfaces";

export abstract class BaseFilter {
  statusQueryArray: QueryLabel[] = [];
  sortingQueryMap: object = {};

  get sortingQueryLabel() {
    return this.getLabelArrayFromMap(this.sortingQueryMap)
  }

  getLabelArrayFromMap(queryMap) {
    let keys = Object.keys(queryMap);
    return _.map(keys, (key: string) => {
      let label = queryMap[key] || key;
      return {
        value: key,
        label
      }
    });
  }

  getQueryDisplay(queryArray: QueryLabel[], key): QueryLabel[] {
    return _.map(queryArray, (queryLabel) => {
      let value = queryLabel.keys ? queryLabel.keys.toString() : queryLabel.key;
      return {...queryLabel, param: {[key]: value}}
    })
  }

  getQueryLabel(query): QueryLabel[] {
    const keys = Object.keys(query);
    return _.reduce(keys, (acc: QueryLabel[], key: string) => {
      const value = query[key] || (key);
      const label = this.getQueryLabelFromValue(value, key);
      let queryLabel = {
        label,
        keys: [key],
        key: key,
        param: {[key]: value}
      };
      return label ? [...acc, queryLabel] : acc
    }, [])
  }

  getQueryLabelFromValue(value: string, key?: string): string | null {
    if(key === 'search') return value;
    let queryLabel = _.find(this.allQueryArray, (queryLabel: QueryLabel) => {
      let valueString;
      if(queryLabel.values) {
        valueString = queryLabel.values.toString();
      } else if(queryLabel.values) {
        valueString = queryLabel.values;
      } else {
        return false
      }
      return valueString === value
    });
    return queryLabel ? queryLabel.label : null
  }

  abstract get allQueryArray()

};
