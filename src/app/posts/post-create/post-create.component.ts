import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../posts.model';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  @Output() postCreated =  new EventEmitter<Post>();
  // newPost = 'No Content';

  onAddPost(postForm: NgForm ) {
    if (postForm.invalid) {
      return;
    }
    // this.newPost = this.enteredValue;
    const post: Post = {
      title: postForm.value.title,
      content: postForm.value.content
    };
    this.postCreated.emit(post);
  }
}
