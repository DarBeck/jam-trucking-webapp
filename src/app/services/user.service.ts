import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Observable<User | null>;
  private userSubject: BehaviorSubject<User | null>;

  constructor() {
    let userObj = localStorage.getItem('user');
    this.userSubject =
      userObj == null
        ? new BehaviorSubject<User | null>(null)
        : new BehaviorSubject<User | null>(JSON.parse(userObj));
    this.user = this.userSubject.asObservable();
  }

  get userData(): User | null {
    return this.userSubject.value;
  }

  updateUser(user: User) {
    this.userSubject.next(user);
  }

  
}
