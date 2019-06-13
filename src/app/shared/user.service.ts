import { Injectable } from '@angular/core';

import {HttpClient,  HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

selectedUser: User = {
	fullName: '',
	email:'',
	password: '' 
};



  constructor(private http: HttpClient) { }

  postUser(user: User) {
  	return this.http.post(environment.apiBaseUrl+'/register',user);
  }

 

  login(authCredentials) {
  	console.log('this login in userService',authCredentials)
  	  	return this.http.post(environment.apiBaseUrl + '/userProfile',authCredentials)

  }

  getProducts() {
 	return this.http.get(environment.apiBaseUrl + '/getProducts')

  }

  paypal(productId) {
    return this.http.post(environment.apiBaseUrl+'/payPal',productId);

  }

  card(product) {
    return this.http.post(environment.apiBaseUrl+'/creditCard',product);
  }
getProductBYId(id){
  return this.http.get(`${environment.apiBaseUrl}/product/${id}`)
}


}
