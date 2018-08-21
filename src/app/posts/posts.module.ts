import { NgModule } from '../../../node_modules/@angular/core';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '../../../node_modules/@angular/common';
import { RouterModule } from '../../../node_modules/@angular/router';



@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    CommonModule,
    RouterModule
  ]
})
export class PostsModule {

}
