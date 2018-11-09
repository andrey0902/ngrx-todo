import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { take } from 'rxjs/internal/operators';

export enum modeStatus  {
  VERIFY_EMAIL = 'verifyEmail',
  VERIFY_REST_PASSWORD = 'resetPassword'
}

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  public modeStatus = modeStatus;
  public mode: string;
  public code: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMode();
  }

  getMode() {
    this.route.queryParamMap.pipe(
      take(1)
    )
      .subscribe((params: ParamMap) => {
       this.mode = params.get('mode');
       this.code = params.get('oobCode');
    });
  }
}
