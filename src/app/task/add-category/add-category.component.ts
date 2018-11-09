import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  @Output() addNewCategory = new EventEmitter<string>();
  isEdit = false;
  categoryControl: FormControl;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createControl();
  }

  createControl() {
    this.categoryControl = this.fb.control(
      null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
    );
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }

  save() {
    if (this.categoryControl.invalid) {
      return;
    }
    this.addNewCategory.emit(this.categoryControl.value);
    this.clearControl();
    this.changeMode();
  }

  clearControl() {
    this.categoryControl.reset(null, {onlySelf: true});
  }

}
