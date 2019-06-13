import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

 model ={
    email :'',
    password:''
  };

  serverErrorMessages: string;
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
  	this.userService.login(form.value).subscribe(
      res =>{
      	console.log("res............",res)
        this.router.navigateByUrl('/products');

      },
      err => {
        this.serverErrorMessages = err.error.message
      })
  }

}
