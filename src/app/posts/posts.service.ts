import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './posts.model';
import { Injectable } from '../../../node_modules/@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient,
              private router: Router) {}

  getPosts() {
    // return [...this.posts]; // does not return the actual array. Can also use splice
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts/')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  addPost(post: Post, image: File) {
    // const postAdded: Post = {
    //   id: null,
    //   title: post.title,
    //   content: post.content
    // };
    const postAdded = new FormData();
    postAdded.append('title', post.title);
    postAdded.append('content', post.content);
    postAdded.append('image', image, post.title);
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts/', postAdded)
      .subscribe((responseData) => {
        const postAdd: Post = {id: responseData.postId, title: post.title, content: post.content };
        const id = responseData.postId;
        postAdd.id = id;
        this.posts.push(postAdd);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });

    // console.log(this.posts);
  }

  updatePost(id: string, post: Post) {
    const updatedpost: Post = {
      id: id,
      title: post.title,
      content: post.content
    };
    this.http.put('http://localhost:3000/api/posts/' + id, updatedpost)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = updatedpost;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    console.log(postId);
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

}
