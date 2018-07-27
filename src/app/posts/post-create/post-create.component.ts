import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  @Output() postCreated =  new EventEmitter();
  // newPost = 'No Content';

  onAddPost() {

    // this.newPost = this.enteredValue;
    const post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post);
  }
}
