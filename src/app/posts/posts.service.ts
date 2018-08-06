import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './posts.model';
import { Injectable } from '../../../node_modules/@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient,
              private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    // return [...this.posts]; // does not return the actual array. Can also use splice
    this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/posts/' + queryParams)
    .pipe(map((postData) => {
      return {posts: postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath,
          creator: post.creator
        };
      }),
      maxPosts: postData.maxPosts
    };
    }))
    .subscribe((transformedPostData) => {
      console.log(transformedPostData);
      this.posts = transformedPostData.posts;
      this.postsUpdated.next({posts: [...this.posts], postCount: transformedPostData.maxPosts});
    });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id: string,
                          title: string, content: string, imagePath: string, creator: string}>('http://localhost:3000/api/posts/' + id);
  }

  addPost(post: Post, image: File) {
    // const postAdded: Post = {
    //   id: null,
    //   title: post.title,
    //   content: post.content
    // };
    const postAdded = new FormData();
    postAdded.append('id', null);
    postAdded.append('title', post.title);
    postAdded.append('content', post.content);
    postAdded.append('image', image, post.title);
    this.http.post<{message: string, post1: Post}>('http://localhost:3000/api/posts/', postAdded)
      .subscribe((responseData) => {
        // console.log(responseData.post1);
        // const postAdd: Post = {
        //   id: responseData.post1.id,
        //   title: post.title,
        //   content: post.content,
        //   imagePath: responseData.post1.imagePath
        //  };
        // const id = responseData.post1.id;
        // postAdd.id = id;
        // this.posts.push(postAdd);
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });

    // console.log(this.posts);
  }

  updatePost(id: string, post: Post, image: File | string) {
    let postData: Post | FormData ;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', image, post.title);
    } else {
      postData = {id: id, title: post.title, content: post.content, imagePath: image, creator: null};
    }
    // const updatedpost: Post = {
    //   id: id,
    //   title: post.title,
    //   content: post.content,
    //   imagePath: null
    // };
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
    .subscribe(response => {
      // const updatedPosts = [...this.posts];
      // const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      // const postUpdated: Post = {
      //   id: id,
      //   title: post.title,
      //   content: post.content,
      //   imagePath: ''
      //  };
      // updatedPosts[oldPostIndex] = postUpdated;
      // this.posts = updatedPosts;
      // this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    console.log(postId);
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
    // .subscribe(() => {
    //   const updatedPosts = this.posts.filter(post => post.id !== postId);
    //   this.posts = updatedPosts;
    //   this.postsUpdated.next([...this.posts]);
    // });
  }

}
