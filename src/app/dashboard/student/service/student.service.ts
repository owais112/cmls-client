import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentPayload } from '../create-student/model/create-student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  // createStudent(payload: StudentPayload): Observable<any> {
  //   return this.httpClient.post('student', payload).pipe(
  //     map((response: any) => {
  //       return response;
  //     })
  //   );
  // }
}
