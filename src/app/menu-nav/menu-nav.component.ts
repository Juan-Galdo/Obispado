
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent {

  isSidebarOpen = false;

  constructor(public _authService:LoginService) {}
  ngOnInit(): void {

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this._authService.loggedOut();
  }

}