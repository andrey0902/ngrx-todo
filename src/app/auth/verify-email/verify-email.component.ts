import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { AuthStoreFacadeService } from '../shared/services/auth-store-facade.service';
import { TaskStoreFacadeService } from '../../task/shared/services/task-store-facade.service';
import { filter, take } from 'rxjs/internal/operators';
import { SessionService } from '../../core/session.service';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  @Input() code: string;
  constructor(private authFacadeService: AuthStoreFacadeService,
              private taskFacadeService: TaskStoreFacadeService,
              private sessionService: SessionService) { }

  ngOnInit() {
    if (this.code) {
      this.getDefaultCategory();
      this.selectCategory();
      this.sentCode(this.code);
    } else {
      // do something
    }
    // this.route.queryParamMap.subscribe((params: ParamMap) => {
    //   console.log(params);
    //   const code = params.get('oobCode');
    //   console.log('code', code);
    //   code ? this.sentCode(code) : 'dispatch event error';
    // });
  }

  sentCode(code: string) {
    // this.authService.applyCode(code);
    this.authFacadeService.dispatchApplyCode(code);
  }

  getDefaultCategory() {
    this.taskFacadeService.getDefaultCategory();
  }

  selectCategory() {
    combineLatest([this.sessionService.getUser$().pipe(filter(v => !!v)), this.taskFacadeService.selectDefaultCategory().pipe(filter(v => v))])
      .pipe(

      ).subscribe(([user, defaultCategory]) => {
      console.log('send dispatch create user', 'user id and category', user, defaultCategory);
       this.authFacadeService.dispatchCreateDefaultUser({user: user, category: defaultCategory});
    } );
  }

}
