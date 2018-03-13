import {Component} from '@nestjs/common';
import {ApiService} from './api.service';
import DataLoader = require('dataloader');
import {IUser} from 'ht-models';

@Component()
export class UsersService {
  api;
  constructor(public apiService: ApiService) {
    this.api = apiService.api.users;
  }

  createLoader(token: string) {
    return new DataLoader<string, IUser>((keys) => {
      return this.apiService.keysToValues(keys, (query) => {
        return this.api.index(query, token)
      }).toPromise();
    })
  }
}