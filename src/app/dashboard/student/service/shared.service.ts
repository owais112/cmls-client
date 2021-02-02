import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public sendSelectedStudentData = new Subject<any>();

    sendMessage(message: any) {
        this.sendSelectedStudentData.next(message);
    }

    clearMessages() {
        this.sendSelectedStudentData.next();
    }

    getMessage(): Observable<any> {
        return this.sendSelectedStudentData.asObservable();
    }
}
