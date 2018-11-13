import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-min-length-error',
  templateUrl: './min-length-error.component.html',
  styleUrls: ['./min-length-error.component.css']
})
export class MinLengthErrorComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
