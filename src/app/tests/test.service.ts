import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Test } from './test';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private testsUrl = 'api/tests';

  constructor(private http: HttpClient) {}

  gettests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.testsUrl).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createtest(test: Test): Observable<Test> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // test Id must be null for the Web API to assign an Id
    const newtest = { ...test, id: null };
    return this.http.post<Test>(this.testsUrl, newtest, { headers }).pipe(
      tap(data => console.log('createtest: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deletetest(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.testsUrl}/${id}`;
    return this.http.delete<Test>(url, { headers }).pipe(
      tap(data => console.log('deletetest: ' + id)),
      catchError(this.handleError)
    );
  }

  updatetest(test: Test): Observable<Test> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.testsUrl}/${test.id}`;
    return this.http.put<Test>(url, test, { headers }).pipe(
      tap(() => console.log('updatetest: ' + test.id)),
      // Return the test on an update
      map(() => test),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
