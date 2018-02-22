import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-new-quotes',
  templateUrl: './new-quotes.component.html',
  styleUrls: ['./new-quotes.component.css']
})
export class NewQuotesComponent implements OnInit {

  constructor(private _apiService: ApiService, private _route: ActivatedRoute, private _router: Router) { }

  emptyArr : Object[] = [];

  author = {
    id: "",
    name: "",
    quotes: this.emptyArr
  }

  newQuote = {
    content: "",
    score: 0
  }

  id: String;
  errors: String;

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

  addQuote() {
    if (this.newQuote.content.length < 3) {
      this.errors = "A quote must contain at least 3 characters!"
      return
    }
    console.log(this.newQuote);
    this.author.quotes.push(this.newQuote);
    console.log(this.author);
    this.editAuthor();
  }

  editAuthor() {
    let observable = this._apiService.editOne(this.author);
    observable.subscribe((response:any)=>{
      console.log(response);
      if (response.errors) {
        //let user know
      } else {
        this._router.navigate(['quotes/' + this.id]);
      }
    })
  }

  clearField() {
    this._router.navigate(['/quotes/' + this.id])
  }
}
