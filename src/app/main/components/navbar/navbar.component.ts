import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  userImage: string = '/assets/images/profile-image-placeholder.png';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.userData;
  }

  logout() {
    this.userService.updateUser(null);
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
