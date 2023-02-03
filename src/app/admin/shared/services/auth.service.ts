import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { User} from "../../../shared/Interfaces";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'}) //{providedIn: 'root'} - register this service in AppModule
export class AuthService{

  //this is public variable as observable but also can emit events
  public error$: Subject<string> = new Subject<string>()

  //+ reg this service in AdminModule in providers
  constructor(private http: HttpClient) {
  }


  login(user: User): Observable<User>{
    user.returnSecureToken = true //need for sending to FireBase for login
    //put url in << `...` >> for using Template-Engine
    return this.http.post<User>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fbApiKey}`, user)
      .pipe(tap(this.setToken),
        catchError(this.handleError.bind(this)))
  }



  logout(){
    this.setToken(null)
  }


  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error
    //console.log('My error', message)
    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('You wrote invalid password')
        break
      case 'INVALID_EMAIL':
        this.error$.next('You wrote invalid email')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('This email is not registered')
        break
    }

    return throwError(() => error)
  }

  isAuthenticated(): boolean {
    return !!this.token // !! - make boolean value
  }


  get token(): string {
    const expDate = new Date(localStorage.getItem('fire-base-expdate')!)
    if (new Date() > expDate) {
      this.logout()
      return null!
    } else {
      return localStorage.getItem('fire-base-token')!
    }
  }

  //it is not setter, just private method
  //work by RxJs-stream
  private setToken(response: any) {
    //console.log(response)
    if (response) { // if response not equals null
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fire-base-token', response.idToken)
      localStorage.setItem('fire-base-expdate', expDate.toString())
      // console.log('fire-base-token', response.idToken)
      // console.log('fire-base-token', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

}
