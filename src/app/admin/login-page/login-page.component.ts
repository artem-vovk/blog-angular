import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../shared/Interfaces";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  formLogin!: FormGroup;
  submitted: boolean = false //need for block button for time when we are waited answer from the server
  message!: string


  constructor(
    private fb: FormBuilder,
    public authService: AuthService, //public because we need to use this obj in other file - html
    private router: Router,
    private route: ActivatedRoute //for reading url params
  ) {}
  ngOnInit(): void {
    this._createForm()

    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = 'Please, write info'
      } else if (params['authFailed']) {
        this.message = 'Need to login for new Post creation'
      }
    })
  }

  private _createForm() {
    this.formLogin = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    })
  }

  get getEmail() {
    return this.formLogin.get('email')
  }

  get getPassword() {
    return this.formLogin.get('password')
  }


  submit() {
    console.log(this.formLogin)
    console.log('actualLength', this.formLogin.get('password')?.errors?.['minlength']['actualLength'])

    if (this.formLogin.invalid){
      return
    }

    this.submitted = true // turn off btn

    //put value from form to object
    const user: User = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }
    console.log('email', user.email)
    console.log('pass', user.password)

    //send object to server cross a service
    this.authService.login(user).subscribe({
      next: () => {
          this.formLogin.reset() //clear html-form
          this.router.navigate(['/admin', 'dashboard']) //redirection
          this.submitted = false // Enable btn
        },
      error: () => {this.submitted = false}
      })
  }


}

