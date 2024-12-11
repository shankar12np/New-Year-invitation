import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Simulate user login
  login(email: string, password: string): Observable<boolean> {
    if (email === 'asdf@gmail.com' && password === '1230') {
      this.authState.next(true);
      return of(true); // Emit true on successful login
    } else {
      return of(false); // Emit false for invalid credentials
    }
  }

  // Check if user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  // Simulate logout
  logout(): void {
    this.authState.next(false);
  }
}
