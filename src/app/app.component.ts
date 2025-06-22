import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductListingPageComponent } from './product-listing-page/product-listing-page.component';
import {HttpClientModule , HttpClient, provideHttpClient} from '@angular/common/http';
import { SignUpService } from './sign-up.service';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , RouterModule , SignUpPageComponent , CartPageComponent , ProductListingPageComponent , ProductDetailPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Shopping-app';
}
