//interceptor need to registered in main module (app.module)

//interceptor work with errors AND send token about user is login with each query what we send to server

import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../admin/shared/services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isAuthenticated()){
      //put token for every query, make clone obj for query for changing
      req = req.clone({
        setParams: {
          auth: this.authService.token //fireBase waits token to param "auth"
        }
      })
    }
    return next.handle(req) //send request with auth token
      .pipe(
        // tap(() => {  //take answer from server
        //   console.log('interceptor') //show interceptors work
        // }),
        catchError((error: HttpErrorResponse) => {   //getError from http request
          console.log('[Interceptor error]: ', error )
          if (error.status === 401) {
            this.authService.logout()
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true //add new param
              }
            })
          }
          return throwError(() => new Error('testError'))
        })
      )
  }

}



