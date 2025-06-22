import { Routes } from '@angular/router';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductListingPageComponent } from './product-listing-page/product-listing-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { HeaderComponent } from './header/header.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {path:'' , component:SignUpPageComponent},
    {path: 'Login' , component:LoginPageComponent},
    {path : 'Cart' , component:CartPageComponent , canActivate : [authGuard]},
    {path : 'productListing' , component:ProductListingPageComponent , canActivate : [authGuard]},
    {path : 'productDetail/:id' , component:ProductDetailPageComponent , canActivate : [authGuard]},
];
