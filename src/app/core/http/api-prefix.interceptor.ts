import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '..';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private _AuthenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: 'https://sms12-api.herokuapp.com/' + request.url,
      setHeaders: {
        Authorization: `Bearer ${this._AuthenticationService.accessToken}`
      }
    });

    return next.handle(request);
  }
}

// http://localhost:3000/
// https://sms12-api.herokuapp.com/
