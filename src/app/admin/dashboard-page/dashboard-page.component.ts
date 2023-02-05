import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/services/posts.service";
import {Post} from "../../shared/Interfaces";
import {Subscriber, Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  postSubscribe!: Subscription //this is var, then we put Subscription in this var
  // AND clause Subscription
  deleteSubscribe!: Subscription

  searchPost = '' //str for filter list of posts - work with custom pipe

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ){}

  ngOnInit(): void {
    this.postSubscribe = this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts.reverse() //put in local var data/object from server
    })
  }


  removePost(id: string) {
    this.postsService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter( post => post.id !== id )
      this.alertService.warning('Post is deleted')
    })
  }


  //this method works when customer clause webpage
  // value!: string;

  ngOnDestroy(): void {
    if(this.postSubscribe) {
      this.postSubscribe.unsubscribe()
    }
    if(this.deleteSubscribe) {
      this.deleteSubscribe.unsubscribe()
    }
  }


  reversPost(value: Event) {

    this.posts.reverse()
  }
}
