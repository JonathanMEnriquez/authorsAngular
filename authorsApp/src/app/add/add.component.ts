import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router) { }

  newAuthor:any = { name: "" };
  error:String = "";

  ngOnInit() {

  }

  clearField(){
    this.newAuthor.name = "";
    this._router.navigate(['']);
  }

  addAuthor(){
    console.log(this.newAuthor);
    if (this.newAuthor.name != "") {
      let observable = this._apiService.newAuthor(this.newAuthor);
      observable.subscribe((responseData)=>{
        console.log(responseData);
      })
    }
    // clear field
    this.clearField();
  }

}
