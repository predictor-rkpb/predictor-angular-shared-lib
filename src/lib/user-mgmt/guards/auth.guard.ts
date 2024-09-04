import { inject, Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserDetailsService } from "../services/user-details.service";

@Injectable()
export class AuthGuard {
  constructor(private userDetailsService: UserDetailsService) {
  }

  canActivate(): boolean {
    return this.userDetailsService.isLoggedIn()
  }
}