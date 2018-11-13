import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-max-length-error',
  templateUrl: './max-length-error.component.html',
  styleUrls: ['./max-length-error.component.css']
})
export class MaxLengthErrorComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
