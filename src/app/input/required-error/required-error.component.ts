import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-required-error',
  templateUrl: './required-error.component.html',
  styleUrls: ['./required-error.component.css']
})
export class RequiredErrorComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
