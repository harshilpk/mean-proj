import { Subject } from 'rxjs';

import { Post } from './posts.model';


export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts]; // does not return the actual array. Can also use splice
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    const postAdded: Post = {
      title: post.title,
      content: post.content
    };
    this.posts.push(postAdded);
    // console.log(this.posts);
    this.postsUpdated.next([...this.posts]);
  }
}
