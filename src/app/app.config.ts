import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'Go-tech',
  version: 3,
  objectStoresMeta: [
    {
      store: 'users',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'cName', keypath: 'cName', options: { unique: false } },
        { name: 'cEmail', keypath: 'cEmail', options: { unique: false } },
        { name: 'cPass', keypath: 'cPass', options: { unique: false } },
        { name: 'bCheck', keypath: 'bCheck', options: { unique: false } }
      ]
    } ,
    {
      store: 'admin',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'cName', keypath: 'cName', options: { unique: false } },
        { name: 'cEmail', keypath: 'cEmail', options: { unique: false } },
        { name: 'cPass', keypath: 'cPass', options: { unique: false } },
        { name: 'bCheck', keypath: 'bCheck', options: { unique: false } },
        { name: 'cRole', keypath: 'cRole', options: { unique: false } },
      ]
    },
    {
      store: 'customers',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'cName', keypath: 'cName', options: { unique: false } },
        { name: 'cNotes', keypath: 'cNotes', options: { unique: false } },
      ]
    }
  ]
};



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimationsAsync(),
  provideExperimentalZonelessChangeDetection(),
  importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig))
  ]
};
