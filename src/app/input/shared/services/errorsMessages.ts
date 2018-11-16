import { Injectable } from '@angular/core';
import { ErrorMessageModel } from '../errorMessage.model';

@Injectable()
export class ErrorsMessagesService {
  public errors: ErrorMessageModel;
  constructor() {
  }
}
