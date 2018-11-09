import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TaskStoreFacadeService } from '../services/task-store-facade.service';
import { debounceTime, filter, takeWhile } from 'rxjs/internal/operators';
import { fromEvent } from 'rxjs/index';

@Directive({
  selector: '[appDragTask]'
})
export class DragTaskDirective implements OnDestroy, OnInit {
  height: number | null;
  componentAction = true;
  can = true;
  constructor(private el: ElementRef,
              private taskFacade: TaskStoreFacadeService) {
    console.log('el', this.el);
  }

  ngOnInit(): void {
    this.getHeightTask();

    // fromEvent(this.el.nativeElement, 'dragenter')
    //   .pipe(
    //     debounceTime(500),
    //     filter(() => this.can)
    //   ).subscribe(() => {
    //   console.log('dragenter');
    //   const hc = this.el.nativeElement.offsetHeight;
    //   this.el.nativeElement.style.height = `${hc + this.height}px`;
    //   this.change();
    // });
    //
    // fromEvent(this.el.nativeElement,'dragleave')
    //   .pipe(
    //     debounceTime(500),
    //     filter(() => !this.can)
    //   ).subscribe(() => {
    //   console.log('dragleave');
    //   const hc = this.el.nativeElement.offsetHeight;
    //   this.el.nativeElement.style.height = `${hc - this.height}px`;
    //   this.change();
    // });

  }

  ngOnDestroy(): void {
    this.componentAction = false;
  }

  // @HostListener('dragenter') public dragTaskOver() {
  //   console.log('DRAG TASK dragover', this.el.nativeElement.offsetHeight);
  //   console.log(' this.height',  this.height);
  //
  //   if (this.can) {
  //     const hc = this.el.nativeElement.offsetHeight;
  //     this.el.nativeElement.style.height = `${hc + this.height}px`;
  //     this.change();
  //   }
  // }

  // @HostListener('dragleave') public dragTaskLeave() {
  //   //console.log('DRAG TASK dragleave');
  //   if (!this.can) {
  //     const hc = this.el.nativeElement.offsetHeight;
  //     this.el.nativeElement.style.height = `${hc - this.height}px`;
  //     this.change();
  //   }
  // }


  change() {
    this.can = !this.can;
  }

  getHeightTask() {
    this.taskFacade.selectTaskHeight$()
      .pipe(
        takeWhile(() => this.componentAction)
      )
      .subscribe(height => this.height = height);
  }

}
