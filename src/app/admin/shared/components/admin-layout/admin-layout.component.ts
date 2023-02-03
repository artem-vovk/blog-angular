import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  //get Router into constr. for redirection
  constructor(
    private router: Router,
    public authService: AuthService
    ){}

  logout(event: Event) {
    event.preventDefault() //override the default behavior of a link
    this.authService.logout()
    this.router.navigate(['/admin', 'login'])

  }

}
