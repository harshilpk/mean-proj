import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '../../../../node_modules/@angular/material';

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
  isLoading = false;
  totalPosts =  0;
  postsperPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2 , 5 , 10];
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    // this.posts = this.postsService.getPosts();
    this.isLoading = true;
    this.postsService.getPosts(this.postsperPage, this.currentPage);
    this.postsSubscription = this.postsService.getPostUpdatedListener()
      .subscribe(
        (postData: {posts: Post[], postCount: number}) => {
          this.isLoading  = false;
          this.totalPosts = postData.postCount;
          this.posts = postData.posts;
        }
      );
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(
      () => {
        this.postsService.getPosts(this.postsperPage, this.currentPage);
      }
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsperPage = pageData.pageSize;
    this.postsService.getPosts(this.postsperPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
