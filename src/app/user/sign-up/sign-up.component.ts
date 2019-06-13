import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	showSuccessMessage: boolean;
	serverErrorMessages: String;

  constructor(private userService: UserService ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
  	this.userService.postUser(form.value).subscribe(
  		res => {
  			this.showSuccessMessage = true;
  			setTimeout(() => this.showSuccessMessage = false,4000);
  			this.resetForm(form)
  		},
  		err => {
  			if(err.status === 422) {
  				this.serverErrorMessages = err.errors.join('<br/>')
  			}
  		} 
  	)
  }


   resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }


}
