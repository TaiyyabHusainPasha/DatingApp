import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode = false;
//users:any;
  constructor() { }

  ngOnInit(): void {
    //this.getUsers();
  }
  registerToggle()
  {
    this.registerMode = !this.registerMode;
  }
 
  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }  

  // getUsers()
  // {
  //   this.users = this.http.get('https://localhost:44310/api/users').subscribe(response => {
  //     this.users = response;
  //   }, error=>{
  //     console.log(error)
  //   });
  // }
}
