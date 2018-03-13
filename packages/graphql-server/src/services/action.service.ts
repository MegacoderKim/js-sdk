import {Component} from '@nestjs/common';
import {ApiService} from './api.service';
import {IAction} from 'ht-models';
import DataLoader = require('dataloader');

@Component()
export class ActionService {
  api;
  constructor(private apiService: ApiService) {
    this.api = apiService.api.actions;
  };

  createLoader(token: string) {
    return new DataLoader<string, IAction>((keys) => {
      return this.apiService.keysToValues(keys, (query) => {
        return this.api.index(query, token)
      }).toPromise();
    })
  }
}