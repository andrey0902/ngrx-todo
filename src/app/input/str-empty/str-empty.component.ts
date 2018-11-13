import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-str-empty',
  templateUrl: './str-empty.component.html',
  styleUrls: ['./str-empty.component.css']
})
export class StrEmptyComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
