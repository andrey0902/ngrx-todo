import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-pattern',
  templateUrl: './default-pattern.component.html',
  styleUrls: ['./default-pattern.component.scss']
})
export class DefaultPatternComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
