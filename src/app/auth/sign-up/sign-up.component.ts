import { Component } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSignup(form: NgForm) {
    // console.log(form.value);
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
