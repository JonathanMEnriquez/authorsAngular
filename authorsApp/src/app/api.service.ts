import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }

  newAuthor(author:any) {
    console.log('newAuthor api');
    return this._http.post('/api/authors', author);
  }

  getAuthors(){
    console.log('get authors');
    return this._http.get('/api/authors');
  }

  deleteOne(auth_id) {
    console.log('delete one apiservice');
    return this._http.delete('/api/authors/'+auth_id);
  }

  getOne(auth_id) {
    console.log('get one apiService');
    return this._http.get('/api/authors/'+auth_id);
  }

  editOne(author) {
    console.log('edit one api');
    return this._http.put('/api/authors/'+author._id, author);
  }
}
