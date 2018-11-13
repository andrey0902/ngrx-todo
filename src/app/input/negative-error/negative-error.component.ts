import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-negative-error',
  templateUrl: './negative-error.component.html',
  styleUrls: ['./negative-error.component.css']
})
export class NegativeErrorComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
