import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { App } from './app';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private appsUrl = 'api/apps';

  constructor(private http: HttpClient) {}

  getapps(): Observable<App[]> {
    return this.http.get<App[]>(this.appsUrl).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createapp(app: App): Observable<App> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // app Id must be null for the Web API to assign an Id
    const newapp = { ...app, id: null };
    return this.http.post<App>(this.appsUrl, newapp, { headers }).pipe(
      tap(data => console.log('createapp: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteapp(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.appsUrl}/${id}`;
    return this.http.delete<App>(url, { headers }).pipe(
      tap(data => console.log('deleteapp: ' + id)),
      catchError(this.handleError)
    );
  }

  updateapp(app: App): Observable<App> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.appsUrl}/${app.id}`;
    return this.http.put<App>(url, app, { headers }).pipe(
      tap(() => console.log('updateapp: ' + app.id)),
      // Return the app on an update
      map(() => app),
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
