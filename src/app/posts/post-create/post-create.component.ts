import { Component } from '@angular/core';


@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'No Content';

  onAddPost() {

    this.newPost = this.enteredValue;
  }
}
