import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  allAuthors:any;
  errorMessage:String;

  ngOnInit() {
    // get all the authors
    this.getAllAuthors();
  }

  getAllAuthors(){
    console.log('get all authors')
    let observable = this._apiService.getAuthors();
    observable.subscribe((responseData:any)=> {
      console.log(responseData);
      if (responseData.errors) {
        console.log(responseData.errors);
      } else {
        this.allAuthors = responseData;
      }
    })
  }

  deleteAuthor(authorId:String) {
    console.log('delete author, ', authorId);
    let observable = this._apiService.deleteOne(authorId);
    observable.subscribe((responseData:any)=>{
      if (responseData.errors) {
        console.log(responseData.errors);
        this.errorMessage = responseData.errors;
      } else {
        this.getAllAuthors();
      }
    })
  }

}
