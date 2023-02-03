import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../shared/Interfaces";

@Pipe({
  name: 'searchPostPipe'
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if(!search.trim()) { //if str search is empty
      return posts
    } else {
      return posts.filter(post => {
        return post.title.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
