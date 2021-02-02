import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from '../../core/local-storage.service';
import { Credentials, SignupPayload, User, LoginPayload, ForgotPayload } from '../model/authentication.model';
import { StudentPayload, Email } from 'src/app/dashboard/student/create-student/model/create-student.model';

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;
  public credentials$ = new EventEmitter<Credentials>();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    const savedCredentials = this.localStorageService.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  login(
    payload: LoginPayload
  ): Observable<Credentials> {
    return this.httpClient.post('login', payload).pipe(
      map((body: Credentials) => {
        console.log(body)
        this.setCredentials(body);
        return body;
      })
    );
  }

  signup(
    payload: SignupPayload
  ): Observable<User> {
    return this.httpClient.post('register', payload).pipe(
      map((body: any) => {
        this.setCredentials(body);
        return body;
      })
    );
  }

  assignRole(
    payload: SignupPayload
  ): Observable<User> {
    return this.httpClient.post('assignRole', payload).pipe(
      map((body: any) => {
        this.setCredentials(body);
        return body;
      })
    );
  }

  forgot(
    payload: any
  ): Observable<any> {
    return this.httpClient.post('forgot', payload).pipe(
      map((body: any) => {
        // this.setCredentials(body);
        return body;
      })
    );
  }

  resetPassword(payload: any): Observable<any> {
    return this.httpClient.post('reset', payload).pipe(
      map((body: any) => {
        // this.setCredentials(body);
        return body;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  // logout(): Observable<boolean> {
  //   return this.httpClient
  //     .post('/logout', {
  //       sessionId: this.credentials.session
  //     })
  //     .pipe(
  //       map(() => {
  //         this.setCredentials();
  //         return true;
  //       })
  //     );
  // }
  logout() {
    localStorage.removeItem('credentials');
    this.credentials.token = undefined;
  }

  createStudent(payload: StudentPayload): Observable<any> {
    return this.httpClient.post('student/create', payload).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  modifyStudent(payload: StudentPayload): Observable<any> {
    return this.httpClient.post('student/modify', payload).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllStudents(): Observable<any> {
    return this.httpClient.get('student/all',this.httpOptions).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteStudentByID(studentId: string): Observable<any> {
   return this.httpClient.delete(`student/${studentId}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  sendEmail(payload: any): Observable<any> {
    return this.httpClient.post('sendEmail', payload, this.httpOptions).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  /**
   * File Upload Services
   */

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.httpClient.post('student/uploadFile', formdata, {
      reportProgress: true,
      responseType: 'text'
    }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
  //   const formdata: FormData = new FormData();

  //   formdata.append('file', file);

  //   const req = new HttpRequest('POST', 'student/uploadFile', formdata, {
  //     reportProgress: true,
  //     responseType: 'text'
  //   });

  //   return this.httpClient.request(req);
  // }

  getFiles(): Observable<any> {
    return this.httpClient.get('student/getFile');
  }

  downloadFile(filename: any): Observable<any> {
    return this.httpClient.get(`student/downloadFile/${filename}`);
  }

  /**
   * File Upload Services End
   */

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Get the auth token.
   * @return {string} The auth token is null if user is not authenticated.
   */
  get accessToken(): string | null {
    return this.credentials ? this.credentials.token : null;
  }

  /**
   * Sets the user credentials.
   * @param {Credentials=} Credentials The user credentials.
   */
  private setCredentials(credentials?: Credentials) {
    debugger
    this._credentials = credentials || null;
    if (credentials) {
      this.localStorageService.setItem(
        credentialsKey,
        JSON.stringify(credentials)
      );
      this.credentials$.emit(this._credentials);
    } else {
      this.localStorageService.clearItem(credentialsKey);
    }
  }
}
