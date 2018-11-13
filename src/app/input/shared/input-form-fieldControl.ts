import { Observable } from 'rxjs/index';

export abstract class InputFormFieldControl<T> {
  readonly stateChange$: Observable<boolean>;
  focus: boolean;
  control;
  stateErrors;
}
