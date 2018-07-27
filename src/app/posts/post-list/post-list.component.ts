import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First-Post', content: 'This is the first post\'s content'},
  //   {title: 'Second-Post', content: 'This is the second post\'s content'},
  //   {title: 'Third-Post', content: 'This is the third post\'s content'}
  // ];
  // @Input() posts: Post[] = [];
  posts: Post[] = [];
  private postsSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSubscription = this.postsService.getPostUpdatedListener()
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      );
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
