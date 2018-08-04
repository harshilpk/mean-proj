import { Component } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isLoading = false;

  onSignup(form: NgForm) {
    console.log(form.value);
  }
}
