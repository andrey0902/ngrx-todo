import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-url-pattern-error',
  templateUrl: './url-pattern-error.component.html',
  styleUrls: ['./url-pattern-error.component.css']
})
export class UrlPatternErrorComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
