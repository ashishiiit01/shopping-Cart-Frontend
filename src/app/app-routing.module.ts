import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { ProductComponent } from './user/product/product.component';
import { PaymentOptionsComponent } from './user/payment-options/payment-options.component';


const routes: Routes = [
	{ path:'signup', component:UserComponent,
	  children: [{path:'', component: SignUpComponent}]
	},
	{ path:'login', component:UserComponent,
	  children: [{path:'', component: SignInComponent}]
	},
	{path: '', redirectTo: '/login', pathMatch: 'full'},
	{path:'products', component: ProductComponent },
	{path:'paymentOptions/:productId', component: PaymentOptionsComponent },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
