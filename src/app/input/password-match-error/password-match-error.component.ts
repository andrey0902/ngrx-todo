import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-match-error',
  templateUrl: './password-match-error.component.html',
  styleUrls: ['./password-match-error.component.scss']
})
export class PasswordMatchErrorComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
