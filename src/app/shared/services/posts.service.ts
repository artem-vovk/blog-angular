import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FbCreateResponse, Post} from "../Interfaces";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class PostsService {


  constructor(private http: HttpClient) {
  }


  createPost(post: Post): Observable<Post> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => { //get response from server
          //console.log('response', response)
          const newPost: Post = {
            ...post, //with spread - we write more variable in old object
            id: response.name, //we get id from response from key: name
            date: new Date(post.date)
        }
        //console.log('newPost', newPost)
        return newPost
      }))
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => { // get response and remake to array
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))
      }))
  }


  getById(id: string): Observable<Post>{
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map( (post: Post) => { //parsing response from server
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
    }))
  }


  removePost(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  updatePost(post: Post): Observable<Post>{
    console.log('Пост редактор', post)
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }

}
