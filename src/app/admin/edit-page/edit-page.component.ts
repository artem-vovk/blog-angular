import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Post} from "../../shared/Interfaces";
import {PostsService} from "../../shared/services/posts.service";
import {Subscription, switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy{

  formEdit!: FormGroup
  post!: Post
  submitted = false

  editSubscription!: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService

  ) {}

  ngOnInit(): void {
    //rout does not need to unsubscribe(), it makes automatically
    this.route.params.pipe(
      switchMap ((params: Params) => {
        return this.postsService.getById(params['id'])
    })).subscribe((post: Post) => {
      this.post = post
      this.formEdit = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  editPost() {
    if(this.formEdit.invalid){
      return
    } else {
      this.submitted = true
      this.editSubscription = this.postsService.updatePost({
        ...this.post,
        text: this.formEdit.value.text,
        title: this.formEdit.value.title
      }).subscribe(() => {
        this.submitted = true
        this.alertService.success('Post is updated')
      })
    }
  }

  ngOnDestroy() {
    if(this.editSubscription){
      this.editSubscription.unsubscribe()
    }
  }
}

