import { Injectable } from '@angular/core';

@Injectable()
export class RegExpService {
  public static email = /^([a-z0-9_-]+\.)*[a-z0-9_+0-9-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  public static cardNumber = [
    /^\d/, /\d/, /\d/, /\d/,
    ' ',
    /\d/, /\d/, /\d/, /\d/,
    ' ',
    /\d/, /\d/, /\d/, /\d/,
    ' ',
    /\d/, /\d/, /\d/, /\d/];
  public static expiration = [
    /^\d/, /\d/, '/', /\d/, /\d/
  ];
  public static CVC = [
    /^\d/, /\d/, /\d/, /\d?/,
  ];

  public static zip = [
    /^\d/, /\d{1,10}/g,
  ];
  constructor() { }

}
