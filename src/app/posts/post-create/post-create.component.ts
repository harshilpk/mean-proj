import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '../../../../node_modules/@angular/router';
import { ExtType } from './ext-type.validator';
import { Subscription } from '../../../../node_modules/rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  isLoading = false;
  imagePreview: string;
  post: Post;
  private authStatusSubscription: Subscription;

  form: FormGroup;
  // @Output() postCreated =  new EventEmitter<Post>();
  // newPost = 'No Content';

  constructor(private postsService: PostsService,
              private route: ActivatedRoute,
              private authService: AuthService) {}

    ngOnInit() {
      this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(
        authStatus => {
          this.isLoading = false;
        }
      );
      this.form = new FormGroup({
        'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
        'content': new FormControl(null, {validators: [Validators.required]}),
        'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [ExtType]})
      });
      this.route.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.isLoading  = true;
          // console.log(this.postId);
          // this.post = this.postsService.getPost(this.postId);
          this.postsService.getPost(this.postId).subscribe(
            postData => {
              this.isLoading = false;
              this.post = {id: postData._id,
                title: postData.title, content: postData.content, imagePath: postData.imagePath, creator: postData.creator};
              this.form.setValue({'title': this.post.title, 'content': this.post.content, 'image': this.post.imagePath});
            }
          );
        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
    }

  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    // this.newPost = this.enteredValue;
    const post: Post = {
      id: null,
      title: this.form.value.title,
      content: this.form.value.content,
      imagePath: null,
      creator: null
    };
    this.isLoading = true;
    // this.postCreated.emit(post);
    if (this.mode === 'create') {
      this.postsService.addPost(post, this.form.value.image);
    } else {
      this.postsService.updatePost(this.postId, post, this.form.value.image);
    }

    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      // console.log(this.imagePreview)
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }

  // onAddPost(postForm: NgForm ) {
  //   if (postForm.invalid) {
  //     return;
  //   }
  //   // this.newPost = this.enteredValue;
  //   const post: Post = {
  //     id: null,
  //     title: postForm.value.title,
  //     content: postForm.value.content
  //   };
  //   this.isLoading = true;
  //   // this.postCreated.emit(post);
  //   if (this.mode === 'create') {
  //     this.postsService.addPost(post);
  //   } else {
  //     this.postsService.updatePost(this.postId, post);
  //   }

  //   postForm.reset();
  // }


}
