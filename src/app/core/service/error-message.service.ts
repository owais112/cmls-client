import { EventEmitter, Injectable } from '@angular/core';
import { ErrorMessageObject } from '../model/error.model';

@Injectable()
export class ErrorMessageService {
  private _errors: ErrorMessageObject[] = [];
  public errors$ = new EventEmitter<ErrorMessageObject[]>();

  constructor() {}

  get errors(): ErrorMessageObject[] {
    return this._errors;
  }

  public set(error: string, type: string, serviceUrl: string) {
    this._errors.push({
      id: Date.now(),
      error: error,
      type: type,
      serviceUrl: serviceUrl
    });
    console.log(this._errors);
    this.errors$.emit(this._errors);
  }

  public clear() {
    this._errors = [];
    this.errors$.emit(this._errors);
  }
}
