import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/shared/auth.service';
import { AuthStoreFacadeService } from './auth/shared/services/auth-store-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService,
              private authFacadeService: AuthStoreFacadeService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.auth.getUserStatus$()
      .subscribe(user => {
        if (user) {
          return this.authFacadeService.saveUser(user);
        }
      });
  }
}
