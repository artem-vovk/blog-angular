import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {Post} from "../../Interfaces";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  @Input() post!: Post

  constructor() {
  }

  ngOnInit(): void {
  }

}
