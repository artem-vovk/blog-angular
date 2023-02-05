import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/Interfaces";
import {PostsService} from "../../shared/services/posts.service";
import {AlertService} from "../shared/services/alert.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, OnDestroy{

  formCreatePost!: FormGroup

  createSubscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private alertService: AlertService,

    private router: Router

  ) {
  }

  ngOnInit(): void {
    this._createForm()
  }


  private _createForm() {
    this.formCreatePost = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      author: ['', [Validators.required]]
    })
  }

  submit(){
    if(this.formCreatePost.invalid){
      //nothing
      console.log('formCreatePost.invalid', 'formCreatePost.invalid')
      // console.log(this.formCreatePost)
    } else {
      const post: Post = {
        title: this.formCreatePost.value.title,
        text: this.formCreatePost.value.text,
        author: this.formCreatePost.value.author,
        date: new Date()
      }
      this.createSubscription = this.postsService.createPost(post).subscribe(() => {
        this.formCreatePost.reset()
        this.alertService.success('Post is created')
        this.router.navigate(["/admin", "dashboard"]).then(r => {
          if(this.createSubscription) {
            this.createSubscription.unsubscribe()
          }}
        )

      })
      // console.log('example', 'example')
      // console.log(post)

    }
  }

  ngOnDestroy(): void {
    if(this.createSubscription) {
    this.createSubscription.unsubscribe()
    }
  }

}
