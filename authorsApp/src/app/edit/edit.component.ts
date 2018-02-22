import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router, private _route: ActivatedRoute) { }

  author:any = {
    _id: "",
    name: ""
  }

  ngOnInit() {

      this._route.params.subscribe((params: Params) => this.author._id = params['id']);
      this.getAuthor(this.author._id);
  }

  goHome() {
    this._router.navigate(['']);
  }

  getAuthor(author_id) {
    let observable = this._apiService.getOne(author_id);
    observable.subscribe((responseData:any)=>{
      console.log(responseData);
      if (responseData.errors) {
        // let user know
      } else {
        this.author = responseData.data;
      }
    })
  }

  editAuthor(author_id) {
    if (this.author.name != "") {
      let observable = this._apiService.editOne(this.author);
      observable.subscribe((response:any)=>{
        console.log(response);
        if (response.errors) {
          //let user know
        } else {
          this._router.navigate(['']);
        }
      })
    }
  }

  clearField() {
    this.author.name = "";
  }

}
