import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";



import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products = <any>[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  	this.userService.getProducts().subscribe(
  		res => {
  			this.products = res;

  		},
  		err => {

  		})
  }

  getPaymentOption(product) {
    console.log("product................",product)
    this.router.navigateByUrl('/paymentOptions/'+product._id)
  }

}
