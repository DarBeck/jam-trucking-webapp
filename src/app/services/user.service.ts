import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor() {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') ?? '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  get userData(): User {
    return this.userSubject.value;
  }

  updateUser(user: User) {
    this.userSubject.next(user);
  }

  
}
