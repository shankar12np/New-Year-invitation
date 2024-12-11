import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, take} from 'rxjs';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true; // Allow access
        } else {
          this.router.navigate(['/login']); // Redirect to login if not authenticated
          return false; // Deny access
        }
      })
    );
  }
}
