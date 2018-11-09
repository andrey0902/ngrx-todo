import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatInputModule, MatProgressSpinnerModule, MatSelectModule
} from '@angular/material';
import { AddTaskComponent } from './add-task/add-task.component';

import { reducer } from './state/task.reducer';
import { TaskCardComponent } from './task-card/task-card.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EffectsModule } from '@ngrx/effects';
import { TaskStoreFacadeService } from './shared/services/task-store-facade.service';
import { ResolveTaskService } from './shared/services/resolve-task.service';
import { NgDragDropModule } from 'ng-drag-drop';
import { DragTaskDirective } from './shared/directives/drag-task.directive';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'board',
        component: TasksComponent,
        // resolve: {categories: ResolveTaskService}
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('task', reducer),
    EffectsModule.forFeature([TaskStoreFacadeService]),
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    AngularFireDatabaseModule,
    NgDragDropModule,
  ],
  declarations: [
    TasksComponent,
    TaskComponent,
    AddTaskComponent,
    TaskCardComponent,
    AddCategoryComponent,
    DragTaskDirective,
  ],
  exports: [
    TasksComponent,
    TaskComponent,
    AddTaskComponent,
    TaskCardComponent
  ],
  entryComponents: [
    AddTaskComponent
  ]
})
export class TaskModule { }
