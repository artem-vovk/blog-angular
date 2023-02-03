import {Component, OnInit} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {Post} from "../shared/Interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../shared/services/posts.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit{

  //when we need one time to ger info from server
  //we make obj with type Observable, but not Subscription
  post$!: Observable<Post>

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostsService
  ) {

  }

  ngOnInit(): void {
    this.post$ = this.activatedRoute.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      }))
  }


}
