import { Component, ContentChild, OnInit } from '@angular/core';
import { MatInput } from '@angular/material';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @ContentChild(MatInput) public controlValidation: MatInput;
  constructor() { }

  ngOnInit() {
  }
}
