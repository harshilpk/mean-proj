import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from '../../../node_modules/rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSUbscription: Subscription;
  userAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuth();
    this.authListenerSUbscription = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSUbscription.unsubscribe();
  }
}
