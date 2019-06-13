import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.css']
})
export class PaymentOptionsComponent implements OnInit {
	productId : String;
	messages = <any>[];
	checkoutButton:String;
  product:any = {};
  url = ''

  constructor(private userService: UserService, private _router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
       this.productId = this.activatedRoute.snapshot.paramMap.get("productId")
       console.log("this.productId",this.productId)
        this.getProductDetails()
  }
  getProductDetails(){
    this.userService.getProductBYId(this.productId)
    .subscribe((res:any)=>{
      this.product = res
      this.url = `http://localhost:3000/paywithpaytm?amount=${this.product.price}`
    })
  }



  payPal() {
  	console.log("payPal",this.productId)
  	this.userService.paypal({"product":this.productId}).subscribe(
  	
  		res => {
  			this.messages = res;
  			 for(let i=0; i<this.messages.links.length; i++) {
	        	if(this.messages.links[i].rel === 'approval_url') {
	        		console.log("payment Url",this.messages.links[i].href)
	        		 window.location.href = (this.messages.links[i].href)
	        	}
	        } 

  		},

  		err => {}

  	) 

  }




openCheckout() {
	      	console.log("this. productId",this.productId)

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_QqvwdX9fyf4BV2drs7ciV8zA00XVvKObBy',
      locale: 'auto',
		// successUrl: 'https://6de3043b.ngrok.io/success',
  //  cancelUrl: 'https://6de3043b.ngrok.io/cancel',
      token: function (token: any) {
      	console.log("this. productId",this.productId)
       // var data = {
       // 	"token":token,
       // 	"productId":this.productId
       // }
          fetch(`https://8a899928.ngrok.io/api/creditCard`,{
          	method: 'POST',
          	headers: {
          		'content-Type':'application/json',
          		'Accept':'application/json'
          	},
          	body:JSON.stringify({
          		stripeTokenId: token.id,
          	})
          })
      }
    });

 handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });

  }



}
