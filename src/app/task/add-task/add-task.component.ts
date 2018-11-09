import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StateTasks } from '../state/index';
import { Task } from '../shared/models/task.model';
import { CategoryModel } from '../shared/models/category.model';
import { takeWhile } from 'rxjs/internal/operators';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {

 categories: CategoryModel[];
  nextCategory: null;
  defaultCategory: null;
  taskForm: FormGroup;
  isEditMode = false;
  componentActive = true;
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.categories = this.data.categories;
    this.setMode();
    this.createForm();
    this.prepareFormArray();

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  setMode() {
    this.isEditMode = this.data.task;
  }

  patchForm() {
    this.taskForm.patchValue({...this.data.task});
    this.defaultCategory = this.data.task.category;
    this.handlerChangeCategory();
  }

  handlerChangeCategory() {
    ( this.taskForm.get('category') as FormControl)
      .valueChanges
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe(value => {
        this.nextCategory = value;
        console.log('category', value);
      });
  }

  prepareFormArray() {
    if (this.isEditMode) {
      this.fillFormTasksArray();
      this.patchForm();
    } else {
      this.addNewTask();
    }
  }

  fillFormTasksArray() {
    this.data.task.subTasks.forEach(item => {
      this.addNewTask();
    });
  }

  createForm() {
    this.taskForm = this.fb.group({
      category: [null],
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25) ]],
      subTasks: this.fb.array([])
    });
  }

  createControl(): FormGroup {
    return this.fb.group({
      done: false,
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25) ]]
    });
  }

  addNewTask() {
    this.getTasks().push(this.createControl());
  }

  getTasks(): FormArray {
    return (this.taskForm.get('subTasks') as FormArray);
  }

  deleteControl(index: number): void {
    this.getTasks().removeAt(index);
    this.taskForm.markAsDirty();
  }

  onSubmit() {
    this.isEditMode && this.taskForm.valid ? this.updateToDo() : this.save();
  }

  save() {
    if (!this.taskForm.valid) {
      return;
    }

    let task = this.taskForm.value;
    task = this.checkExistCategory(task);
    this.closeEditMode(task);
  }

  updateToDo() {
    const prevCategory = (!this.nextCategory || this.defaultCategory === this.nextCategory) ? null : this.defaultCategory;
    let task = this.taskForm.value;
        task = {...this.data.task, ...task};

    this.closeEditMode({
      task,
      prevCategory
    });
  }

  checkExistCategory(task: Task) {
    if (!task.category) {
      task.category = this.categories[0].id;
    }
    return task;
  }

  closeEditMode(task?) {
    this.dialogRef.close(task);
  }

}
