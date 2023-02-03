import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

//this class is just service
//Requires registration in the admin.module.ts
@Injectable()
export class AuthGuard implements CanActivate {

  //is it authorised now?
  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isAuthenticated()) {
      return true
    } else {
      this.authService.logout()
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          loginAgain: true
        }
      })
      return false
    }
  }

}
