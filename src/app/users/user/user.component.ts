import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../state/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  control: FormControl;
  @Input() user: User;
  @Output() changeUser = new EventEmitter();
  @Output() deleteUser = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createControl();
    this.patchControl();
  }

  createControl() {
    this.control = this.fb.control([null, [Validators.required]]);
  }

  patchControl() {
    this.control.patchValue(this.user.name);
  }

  save() {
    this.changeUser.emit({
      ...this.user,
      name: this.control.value
    });
  }

  del() {
    this.deleteUser.emit(this.user.id);
  }

}
