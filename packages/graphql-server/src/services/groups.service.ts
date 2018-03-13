import {Component} from '@nestjs/common';
import {ApiService} from './api.service';
import {IGroup} from 'ht-models';
import DataLoader = require('dataloader');

@Component()
export class GroupsService {
  api;
  constructor(private apiService: ApiService) {
    this.api = apiService.api.groups;
  }

  createLoader(token: string) {
    return new DataLoader<string, IGroup>((keys) => {
      return this.apiService.keysToValues(keys, (query) => {
        return this.api.index(query, token)
      }).toPromise();
    })
  }
}