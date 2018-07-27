import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './posts.model';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    // return [...this.posts]; // does not return the actual array. Can also use splice
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    const postAdded: Post = {
      id: null,
      title: post.title,
      content: post.content
    };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', postAdded)
      .subscribe((responseData) => {
        console.log(responseData);
        this.posts.push(postAdded);
        this.postsUpdated.next([...this.posts]);
      });

    // console.log(this.posts);
  }
}
