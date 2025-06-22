import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { SignUpService } from './sign-up.service';

export const authGuard: CanActivateFn = (route, state) => {

  return true;

};
