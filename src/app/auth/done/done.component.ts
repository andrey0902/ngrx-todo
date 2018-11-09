import { Component, OnInit } from '@angular/core';
import { AuthStoreFacadeService } from '../shared/services/auth-store-facade.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  userEmail: string;
  constructor(private authFacadeService: AuthStoreFacadeService) { }

  ngOnInit() {
  }

  public resendEmail() {
    this.authFacadeService.sendVerifyLink();
    // this.authService.resendEmail(this.userEmail)
    //   .subscribe(val => {
    //     this.snotifyService.success('The message has been resent. Please check your email.', 'Success');
    //   });
  }

}
