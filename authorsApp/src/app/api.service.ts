import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/src/client';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }

  newAuthor(author:any) {
    console.log('newAuthor api');
    return this._http.post('/api/authors', author);
  }

}
