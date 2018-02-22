import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router, private _route: ActivatedRoute) { }
  author = {
    _id: "",
    name: "",
    quotes: []
  }
  id: String;

  ngOnInit() {
    this._route.params.subscribe(( params: Params) => this.id = params['id']);
    this.getAuthor(this.id);
  }

  getAuthor(author_id) {
    let observable = this._apiService.getOne(author_id);
    observable.subscribe((responseData:any)=>{
      console.log(responseData);
      if (responseData.errors) {
        this._router.navigate(['']);
      } else {
        this.author = responseData.data;
      }
    })
  }

  upVote(index) {
    this.author.quotes[index].score += 1;
    this.editAuthor();
  }

  downVote(index) {
    this.author.quotes[index].score -= 1;
    this.editAuthor();
  }

  deleteQuote(index) {
    this.author.quotes.splice(index, 1);
    this.editAuthor();
  }

  editAuthor() {
    let observable = this._apiService.editOne(this.author);
    observable.subscribe((response:any)=>{
      console.log(response);
      if (response.errors) {
        //let user know
      } else {
        this._route.params.subscribe(( params: Params) => this.id = params['id']);
        this.getAuthor(this.id);
      }
    })
  }
}
