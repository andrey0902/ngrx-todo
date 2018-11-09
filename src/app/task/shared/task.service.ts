import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs/index';
import { AngularFireDatabase } from '@angular/fire/database';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { map, switchMap, tap } from 'rxjs/internal/operators';
import { AddTaskModel } from './models/add.task.model';
import { CategoryModel } from './models/category.model';
import { Task } from './models/task.model';
import { User } from '../../auth/shared/user';
import { DragTask, IFullUpdateTask } from './models/actions.model';
import { TaskStoreFacadeService } from './services/task-store-facade.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public dataUser;
  constructor(private db: AngularFireDatabase,
              private fasad: TaskStoreFacadeService) {
    this.dataUser = this.db.object('/users');
  }

  /**
   * get user category
   * */
  getUserCategory(uid) {
    return this.db.list(`/users/${uid}/category`).snapshotChanges()
      .pipe(
        map((categories) => {
          return categories.map(category => {
            return {id: category.key, name: category.payload.val()};
          });
        })
      );
  }


  getDefaultCategory() {
    return this.db.list('/defaultCategory').snapshotChanges();
  }

  /**
   * send default categories for user when user apply his own cod
   * */

  sendDefaultCategory({user, category}) {
    return forkJoin([this.pushNewCat(
      {user, cat: category[0]}),
      this.pushNewCat({user, cat: category[1]}),
      this.pushNewCat({user, cat: category[2]})]);
  }
  /**
   * add single new category for user
   * */
  pushNewCat({user, cat}) {
    return fromPromise( this.db.list(`/users/${user.uid}/category`).push(cat));
  }

  /**
   * delete category
   * */
  removeCategory({user, cat}): Observable<any> {
    return fromPromise(
      this.db.list(`/users/${user.uid}/category`).remove(cat.id)
    )
      .pipe(
        switchMap(
          () => this.removeCategoryWithTasks(user, cat)
        )
      );
  }
  /**
   * delete category and with tasks
   * */
  removeCategoryWithTasks(user, cat) {
    return fromPromise(
      this.db.list(`/users/${user.uid}/tasks/`)
        .remove(cat.id)
    );
  }

  /**
   * send save new task
   * */
  saveNewTask(data: AddTaskModel): Observable<any> {
    return fromPromise(this.db.list(`/users/${data.user.uid}/tasks/${data.task.category}`).push(data.task));
  }

  moveTask(task: Task, categories: CategoryModel[], user: User, next?) {

    const nextCategory = this.searchCategory(categories, task.category, next);

    return this.deleteTask(user.uid, task.category, task.id)
      .pipe(
        tap(() => {
          task.category = nextCategory;
        }),
        switchMap(() => this.saveNewTask({
          user,
          task
        }))
      );
  }

  searchCategory(listCat: CategoryModel[], cat: string, next?): string | null {
    const num = next ? 1 : -1;
    const currentIndex = listCat.findIndex(item => item.id === cat);
    return currentIndex > -1 ? listCat[currentIndex + num].id : null;
  }

  deleteTask (uid: string, idCat: string, taskId) {
    return fromPromise(
      this.db.list(`/users/${uid}/tasks/${idCat}`).remove(taskId)
    );
  }

  getTasksSingCategory({user, category}): Observable<{[key: string]: Task[]}> {
    return this.db.list(`/users/${user.uid}/tasks/${category}`).snapshotChanges()
      .pipe(
        map((data: any) => {
          return {
            [category]: data.map((item: any) => new Task({...item.payload.val(), id: item.key }))
          };
        })
      );
  }

  updateTask({user, task}) {
    return fromPromise(
      this.db.object(`/users/${user.uid}/tasks/${task.category}/${task.id}`)
        .update(task)
    );
  }

  fullUpdateTask(data: IFullUpdateTask) {
    if (!data.prevCategory) {
     return this.updateTask(data);
    }
   return this.deleteTask(data.user.uid, data.prevCategory, data.task.id)
      .pipe(
        switchMap(
          () => this.saveNewTask(data)
        )
      );
  }

  updateSubTask(task, i: number, value: boolean) {
    task.subTasks.forEach((item, index) => {
      if (index === i) {
        item.done = value;
      }
    });
    return task;
  }

  changeCategoryTaskAfterDrop({task, cat}: DragTask) {
    const prevCategory = task.category;
    task.category = cat.id;
    return {
      task,
      prevCategory
    };
  }

  dragTaskStart(height: number) {
    this.fasad.dispatchDragTaskStart(height);
  }
  dragTaskEnd(height: number) {
    this.fasad.dispatchDragTaskEnd(height);
  }
}
